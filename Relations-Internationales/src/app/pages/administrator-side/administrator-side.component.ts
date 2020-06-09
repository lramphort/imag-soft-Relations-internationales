import { Component, OnInit, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MatTableDataSource, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { AddStudentDialogComponent } from 'src/app/components/add-element-dialog/add-student-dialog/add-student-dialog.component';
import { StudentService } from 'src/app/services/back/student.service';
import { DailyTopicsService } from 'src/app/services/back/daily-topics.service';
import { DailyTopic } from 'src/app/models/daily-topic';
import { AdministratorService } from 'src/app/services/back/administrator.service';
import {UpdateStudentDialogComponent} from '../../components/add-element-dialog/update-student-dialog/update-student-dialog.component';


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

  /**
   *
   * @param router: Gère la gestion des routes
   * @param dialog: Permet de gérer les modal
   * @param dailyTopicService: Service gérant les problèmes journaliers
   * @param studentService: Service gérant les étudiants
   * @param administratorService: Service gérant les administrateur
   */
  constructor(private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly dailyTopicService: DailyTopicsService,
    private readonly studentService: StudentService,
    private readonly administratorService: AdministratorService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  logs: { idPerson: string; type: string };

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.areDisplayArchived = false;
    this.archivedStudents = [];
    this.nonArchivedStudents = [];
    this.checkedStudents = [];
    this.initStudentsLists();
    this.dataSource = new MatTableDataSource<Student>([]);
    // tslint:disable-next-line:max-line-length
    this.displayedColumns = ['Signal', 'Name', 'University', 'Last connection', 'Entrant/Leaving', 'OpenInNew', 'SelectRow', 'UpdateStudent'];
    this.dataSource.paginator = this.paginator;
    this.setDataSource();

    this.logs = { idPerson: localStorage.getItem('idPerson'), type: localStorage.getItem('type') };
  }

  /**
   * Récupère toutes les données relatives aux étudiants depuis le back-end
   * Attention, les étudiants ne sont per récupérés depuis le back-end dans cette fonction.
   * Les Students sont récupéré par le composant courant via la route
   */
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

  updateStudentModal(student: Student) {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.maxHeight = '90vh';
    matDialogConfig.data = student;

    dialogRef = this.dialog.open(UpdateStudentDialogComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe((result: Student) => {
      if (result) {
        const idPerson = student.getIdPerson();
        result.setIdPerson(idPerson);
        this.studentService.updateStudent(result).subscribe(() => {
            student = result;
            /**
             * Met à jour les étudiants dans le front-end quand le modification dans le back-end a été effectuée
             */
            this.dataSource.data = this.nonArchivedStudents.map((s: Student) => {
              if (s.getIdPerson() === idPerson) {
                s = result;
              }
              return s;
            });

          },
          err => {
            console.log(err);
          });
      }
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
