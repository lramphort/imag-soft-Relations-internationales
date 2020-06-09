import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Course } from 'src/app/models/course';
import { MarkService } from 'src/app/services/back/mark.service';
import { Mark } from 'src/app/models/mark';
import { Poll } from 'src/app/models/poll';
import { PossibleAnswer } from 'src/app/models/possible-answer';
import { PossibleAnswerService } from 'src/app/services/back/possible-answer.service';
import { PollService } from 'src/app/services/back/poll.service';
import { AddMarkModalComponent } from '../add-mark-modal/add-mark-modal.component';

@Component({
  selector: 'app-course-detail-modal',
  templateUrl: './course-detail-modal.component.html',
  styleUrls: ['./course-detail-modal.component.css']
})
export class CourseDetailModalComponent implements OnInit {

  marks: Mark[] = [];
  polls: Poll[] = [];

  mark: string = '';
  typeMark: string = '';
  textValue: string = '';

  private possibleAnswers: { [idPoll: string]: PossibleAnswer[] } = {};
  selectedAnswers: { [idPoll: string]: string } = {};

  /**
   *
   * @param dialogRef: Le composant permettant de gérer le modal
   * @param dialog: Un autre composant permettant de gérer un autre modal
   * @param markService: Le service gérant les mark
   * @param possibleAnswerService: Le service gérant les réponses possibles
   * @param pollService: Le service gérant les questionnaires
   * @param data
   */
  constructor(public dialogRef: MatDialogRef<CourseDetailModalComponent>,
    public dialog: MatDialog,
    private markService: MarkService,
    private possibleAnswerService: PossibleAnswerService,
    private pollService: PollService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    /**
     * Permet de récupérer les questonnaires depuis le back-end en utilisant les services
     */
    this.pollService.getPollsByStudent(this.data.course.getIdCourse(), this.data.idStudent)
      .subscribe(pollResult => {
        pollResult['polls'].forEach(poll => {
          if (poll.getStatus() !== 'Answered') {
            this.polls.push(poll);
          }
        });
        this.polls.forEach(poll => {
          this.possibleAnswerService.getPossibleAnswersByPoll(poll.getIdPoll()).subscribe(
            possibleAnswersResult => {
              if (!this.possibleAnswers[poll.getIdPoll()]) {
                this.possibleAnswers[poll.getIdPoll()] = [];
              }
              possibleAnswersResult['possibleAnswers']
                .forEach(possibleAnswer => this.possibleAnswers[poll.getIdPoll()].push(possibleAnswer));
            });
        });
      });

    /**
     * Permet de récupérer les notes depuis le back-end en utilisant les services
     */
    this.markService.getMarksByStudent(this.data.course.getIdCourse(), this.data.idStudent).subscribe(
      result => {
        result['marks'].forEach(mark => this.marks.push(mark));
      });
  }

  /**
   * Envoie les modifications au back-end
   * @param poll
   * @param idPoll
   * @param index
   * @param text
   */
  sendAnswer(poll: Poll, idPoll: string, index: number, text: string) {
    this.textValue = text;
    if (this.textValue !== '') {
      /**
       * Envoie les modifications des questionnaires au back-end
       */
      this.pollService.update_poll(this.textValue, poll.getIdPoll()).subscribe(() => {
        this.polls.splice(index, 1);
      });
    } else {
      /**
       * Envoie les modifications des questionnaires au back-end
       */
      this.pollService.update_poll(idPoll, poll.getIdPoll()).subscribe(() => {
        this.polls.splice(index, 1);
      });
    }

  }

  /**
   * Ajoute une note
   */
  addMark() {
    const newData = this.marks;
    /**
     * Ouvre un modal en utilisant le composant AddMarkModalComponent
     */
    const dialog = this.dialog.open(AddMarkModalComponent, {
      width: '250px',
      maxHeight: '90vh',
      disableClose: true,
      data: { mark: this.mark, typeMark: this.typeMark }
    });

    /**
     * Récupère le résultat après la fermeture du modal ouvert précédemment
     */
    dialog.afterClosed().subscribe(result => {
      const newMark = new Mark({
        idMark: null,
        idCourse: this.data.course.getIdCourse(),
        idPerson: this.data.idStudent,
        typeMark: result.typeMark,
        valueMark: result.mark
      });
      /**
       * Met à jour les notes du composant courant
       */
      newData.push(newMark);
      this.marks = newData;
      this.markService.addMark(newMark).subscribe();

    });
  }

}
