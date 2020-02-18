import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SimulatorService } from 'src/app/services/simulator/simulator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { AddPollDialogComponent } from 'src/app/components/add-element-dialog/add-poll-dialog/add-poll-dialog.component';
import { Mark } from 'src/app/models/mark';
import { MarkService } from 'src/app/services/back/mark.service';
import { PollService } from 'src/app/services/back/poll.service';
import { Poll } from 'src/app/models/poll';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  constructor(private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly dialog: MatDialog,
    private readonly markService: MarkService,
    private readonly pollService: PollService) { }

  @Input() selectedStudent: Student;
  @Input() selectedCourse = new Course();
  @Output() backToStudent: EventEmitter<boolean> = new EventEmitter();

  marks: Mark[] = [];
  polls: Poll[] = [];

  ngOnInit() {
    this.markService.getMarksByStudent(this.selectedCourse.getIdCourse(), this.selectedStudent.getIdPerson())
      .subscribe(result => {
        result['marks'].forEach(mark => this.marks.push(mark));
      });

    this.pollService.getPollsByStudent(this.selectedCourse.getIdCourse(), this.selectedStudent.getIdPerson())
      .subscribe(result => {
        result['polls'].forEach(poll => this.polls.push(poll));
      });
  }

  goToStudent(): void {
    this.backToStudent.emit();
  }

  displayAddPollDialog(): void {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.data = this.selectedCourse;
    matDialogConfig.disableClose = true;
    matDialogConfig.maxHeight = '90vh';

    dialogRef = this.dialog.open(AddPollDialogComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pollService.addPoll(result['poll']).subscribe(resultAddPoll => {
          this.polls.push(result['poll']);

          result['answers'].forEach(possibleAnswer => {
            this.pollService.addPossibleAnswer(resultAddPoll[0]['idPoll'], possibleAnswer).subscribe();
          });

        });
      }
    },
      err => {
        console.log(err);
      });
  }
}
