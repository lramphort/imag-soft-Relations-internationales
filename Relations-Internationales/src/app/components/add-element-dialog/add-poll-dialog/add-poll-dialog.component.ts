import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Course } from 'src/app/models/course';
import { Poll } from 'src/app/models/poll';
import { PossibleAnswer } from 'src/app/models/possible-answer';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-add-poll-dialog',
  templateUrl: './add-poll-dialog.component.html',
  styleUrls: ['./add-poll-dialog.component.css']
})
export class AddPollDialogComponent implements OnInit {

  /**
   * Avec les ngModel dans le html, les champs suivants sont mis à jour automatiquement
   */
  question: string;
  possibleAnswers: string[];
  possibleAnswer: string;

  arePossibleAnswersValid: boolean;
  isQuestionValid: boolean;
  isFormValid: boolean;
  /**
   *
   * @param dialogRef: Le composant gérant la modal
   * @param injectedStudent: L'étudiant envoyé à la modal
   * @param injectedCourse: Le cour envoyé à la model
   */
  constructor(private dialogRef: MatDialogRef<AddPollDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedCourse: Course,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

    /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.possibleAnswers = [];
    this.possibleAnswer = '';
    this.isFormValid = true;
  }

  addPossibleAnswer() {
    if (this.possibleAnswer.length > 0) {
      this.possibleAnswers.push(this.possibleAnswer);
      this.possibleAnswer = '';
    }
  }

  removePossibleAnswer(index: number) {
    this.possibleAnswers.splice(index, 1);
  }

  createPoll(): void {
    if (this.checkForm()) {
      const newPoll = new Poll({
        idCourse: this.injectedCourse.getIdCourse(),
        idPerson: this.injectedStudent.getIdPerson(),
        status: 'sent - envoyé',
        question: this.question,
        answer: null,
        dateAnswer: null
      });

      const answers = this.possibleAnswers.map(value => new PossibleAnswer({
        idPossibleAnswer: null,
        idPoll: newPoll.getIdPoll(),
        value: value
      }));

      /**
       * poll et answers sont récupérés dans le composant qui a appelé ce composant. Par exemple CourseDetailsComponent
       */
      this.dialogRef.close({ poll: newPoll, answers: this.possibleAnswers });
    }
  }

  /**
   * Vérifie que les informations du formulaire sont correctement renseignées
   */
  checkForm(): boolean {
    this.isFormValid = true;

    if (this.question && this.question.length > 0) {
      this.isQuestionValid = true;
    } else {
      this.isQuestionValid = false;
      this.isFormValid = false;
    }

    if (this.possibleAnswers && this.possibleAnswers.length > 0) {
      this.arePossibleAnswersValid = true;
    } else {
      this.arePossibleAnswersValid = false;
      this.isFormValid = false;
    }

    return this.isFormValid;
  }
}
