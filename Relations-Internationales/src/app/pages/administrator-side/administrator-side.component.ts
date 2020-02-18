import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentDialogComponent } from 'src/app/components/add-element-dialog/add-student-dialog/add-student-dialog.component';
import { StudentService } from 'src/app/services/back/student.service';
import { DailyTopicsService } from 'src/app/services/back/daily-topics.service';
import { DailyTopic } from 'src/app/models/daily-topic';
import { AdministratorService } from 'src/app/services/back/administrator.service';


@Component({
  selector: 'app-administrator-side',
  templateUrl: './administrator-side.component.html',
  styleUrls: ['./administrator-side.component.css']
})
export class AdministratorSideComponent implements OnInit {

  @Input() studentsInput: Student[] = [];

  archivedStudents: Student[];
  nonArchivedStudents: Student[];
  dataSource: MatTableDataSource<Student>;
  displayedColumns: string[];
  areDisplayArchived: boolean;
  dailyTopics: { idStudent: string, dailyTopics: DailyTopic[] }[] = [];
  checkedStudents: Student[];

  constructor(private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly dailyTopicService: DailyTopicsService,
    private readonly studentService: StudentService,
    private readonly administratorService: AdministratorService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  logs: { idPerson: string; type: string };

  ngOnInit() {
    this.areDisplayArchived = false;
    this.archivedStudents = [];
    this.nonArchivedStudents = [];
    this.checkedStudents = [];
    this.initStudentsLists();
    this.dataSource = new MatTableDataSource<Student>([]);

    this.displayedColumns = ['Signal', 'Name', 'University', 'Last connection', 'Entrant/Leaving', 'OpenInNew', 'SelectRow'];
    this.dataSource.paginator = this.paginator;
    this.setDataSource();

    this.logs = { idPerson: localStorage.getItem('idPerson'), type: localStorage.getItem('type') };
  }

  initStudentsLists(): void {
    this.studentsInput.forEach(student => {

      this.administratorService.getHasBeenSeenTopicsByStudent(student.getIdPerson()).subscribe(result => {
        result === 1 ? student.setHasNewDAilyTopics('true') : student.setHasNewDAilyTopics('false');
      });

      student.getIsArchived() === 'true' ? this.archivedStudents.push(student) : this.nonArchivedStudents.push(student);

      this.dailyTopicService.getDailyTopicsByStudent(student.getIdPerson())
        .subscribe(result => {
          const dailyTopicByStudent = { idStudent: student.getIdPerson(), dailyTopics: [] };
          result['dailyTopics'].forEach(dailyTopic => dailyTopicByStudent.dailyTopics.push(dailyTopic));
          this.dailyTopics.push(dailyTopicByStudent);
        });

    });
  }

  getDailyTopicsByStudent(idPerson: string) {
    this.dailyTopics.forEach(dailyTopic => {
      if (dailyTopic.idStudent === idPerson) {
        return dailyTopic;
      }
    });
  }

  archiveStudents(): void {
    if (this.areDisplayArchived) {
      this.checkedStudents.forEach(student => {
        this.studentService.updateIsArchivedStudent(student.getIdPerson(), 'false').subscribe(() => {
          this.archivedStudents.splice(this.archivedStudents.indexOf(student), 1);
          this.nonArchivedStudents.push(student);
          this.setDataSource();
        },
          err => {
            console.log(err);
            this.archivedStudents.splice(this.archivedStudents.indexOf(student), 1);
            this.nonArchivedStudents.push(student);
            this.setDataSource();
          });
      });
    } else {
      this.checkedStudents.forEach(student => {
        this.studentService.updateIsArchivedStudent(student.getIdPerson(), 'true').subscribe(() => {
          this.nonArchivedStudents.splice(this.nonArchivedStudents.indexOf(student), 1);
          this.archivedStudents.push(student);
          this.setDataSource();
        },
          err => {
            console.log(err);
            this.nonArchivedStudents.splice(this.nonArchivedStudents.indexOf(student), 1);
            this.archivedStudents.push(student);
            this.setDataSource();
          });
      });
    }
  }

  displayArchivedStudents() {
    this.areDisplayArchived = !this.areDisplayArchived;
    this.checkedStudents = [];
    this.setDataSource();
  }

  addStudent() {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.maxHeight = '90vh';
    matDialogConfig.disableClose = true;

    dialogRef = this.dialog.open(AddStudentDialogComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.addStudent(result).subscribe((newStudent) => {
          this.nonArchivedStudents.push(new Student(newStudent['Student'][0]));
          this.setDataSource();
        },
          err => {
            console.log(err);
          });
      }
    });
  }

  setDataSource(): void {
    if (this.areDisplayArchived) {
      this.dataSource.data = this.archivedStudents;
    } else {
      this.dataSource.data = this.nonArchivedStudents;
    }
    this.dataSource.paginator.firstPage();
  }

  goToStudentDetailsPage(studentId: string): void {
    this.router.navigate(['student-details/' + studentId]);
  }

  checkStudent(student: Student): void {
    if (this.checkedStudents.indexOf(student) !== -1) {
      this.checkedStudents.splice(this.checkedStudents.indexOf(student), 1);
    } else {
      this.checkedStudents.push(student);
    }
  }

  isCheckboxChecked(student: Student): boolean {
    return this.checkedStudents.indexOf(student) !== -1;
  }
}
