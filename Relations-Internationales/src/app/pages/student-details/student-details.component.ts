import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/models/student';
import { Course } from 'src/app/models/course';
import { Contact } from 'src/app/models/contact';
import { DailyTopic } from 'src/app/models/daily-topic';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AddCourseDialogComponent } from 'src/app/components/add-element-dialog/add-course-dialog/add-course-dialog.component';
import { AddContactDialogComponent } from 'src/app/components/add-element-dialog/add-contact-dialog/add-contact-dialog.component';
// tslint:disable-next-line:max-line-length
import { AddDailyTopicDialogComponent } from 'src/app/components/add-element-dialog/add-daily-topic-dialog/add-daily-topic-dialog.component';
import { SendEmailDialogComponent } from 'src/app/components/send-email-dialog/send-email-dialog.component';
import { MarkService } from 'src/app/services/back/mark.service';
import { Mark } from 'src/app/models/mark';
import * as jsPDF from 'jspdf';
import { Administrator } from 'src/app/models/administrator';
import { CourseService } from 'src/app/services/back/course.service';
import { DailyTopicsService } from 'src/app/services/back/daily-topics.service';
import { ContactService } from 'src/app/services/back/contact.service';
import { StudentService } from 'src/app/services/back/student.service';
import { AdministratorService } from 'src/app/services/back/administrator.service';
import * as html2canvas from 'html2canvas';
import {AddStudentDialogComponent} from '../../components/add-element-dialog/add-student-dialog/add-student-dialog.component';
import {UpdateStudentDialogComponent} from '../../components/add-element-dialog/update-student-dialog/update-student-dialog.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  @ViewChild('contentPdf') contentPdf: ElementRef;
  @Output() setLanguage: EventEmitter<string> = new EventEmitter<string>();

  constructor(private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private readonly markService: MarkService,
    private readonly router: Router,
    private readonly contactService: ContactService,
    private readonly courseService: CourseService,
    private readonly dailyTopicService: DailyTopicsService,
    private readonly studentService: StudentService,
    private readonly administratorService: AdministratorService) { }

  selectedStudent: Student;
  coursesOfSelectedStudent: Course[];
  contactsOfSelectedStudent: Contact[];
  dailyTopicsOfSelectedStudent: DailyTopic[];

  coursesOfSelectedStudentNotRejected: Course[];

  marks: { idCourse: string; marks: Mark[] }[] = [];
  selectedCourse: Course;
  fullNameUser: string;
  logs: { idPerson: string; type: string };
  isLAPending = false;

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.coursesOfSelectedStudent = [];
    this.coursesOfSelectedStudentNotRejected = [];
    this.contactsOfSelectedStudent = [];
    this.dailyTopicsOfSelectedStudent = [];

    this.logs = { idPerson: localStorage.getItem('idPerson'), type: localStorage.getItem('type') };
// TODO modifier un cour
    this.activatedRoute.data.subscribe(data => {
      this.selectedStudent = data.studentResolverResult[0];
      this.coursesOfSelectedStudent = data.coursesResolverResult['courses'];
      this.contactsOfSelectedStudent = data.contactsResolverResult['contacts'];
      this.dailyTopicsOfSelectedStudent = data.dailyTopicsResolverResult['dailyTopics'];
      console.log(this.dailyTopicsOfSelectedStudent);
      console.log(data);

      this.coursesOfSelectedStudent.forEach(course => {
        this.markService.getMarksByStudent(course.getIdCourse(), this.selectedStudent.getIdPerson())
          .subscribe(result => {
            const marksByCourse = { idCourse: course.getIdCourse(), marks: [] };
            result['marks'].forEach(mark => marksByCourse.marks.push(mark));
            this.marks.push(marksByCourse);
          });
      });

      const userConnected = (localStorage.getItem('type') === 'administrator')
        ? new Administrator(data['loginResolverResult'][0])
        : new Student(data['loginResolverResult'][0]);

      this.fullNameUser = userConnected.getFirstName() + ' ' + userConnected.getLastName();

      this.coursesOfSelectedStudent.forEach(course => {
        if (course.getState() === 'pending') {
          this.isLAPending = true;
        }

        if (course.getState() !== 'rejected') {
          this.coursesOfSelectedStudentNotRejected.push(course);
        }
      });
    });
  }

  /**
   * Ouvre le modal adéquat en fonction de dialogType
   * @param dialogType
   */
  displayAddElementDialog(dialogType: string): void {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.data = this.selectedStudent;
    matDialogConfig.maxHeight = '90vh';

    switch (dialogType) {
      case 'course':
        dialogRef = this.dialog.open(AddCourseDialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.courseService.addCourse(result).subscribe((course) => {
              this.setCourses();

              if (this.selectedStudent.getIsLearningAgreementValid() === 'true') {
                this.setIsLearningAgreementValid();
              }
            });
          }
        });
        break;
      case 'dailyTopic':
        dialogRef = this.dialog.open(AddDailyTopicDialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this.dailyTopicService.addDailyTopic(result).subscribe(() => {
            if (result) {
              this.dailyTopicService.getDailyTopicsByStudent(this.selectedStudent.getIdPerson())
                .subscribe(dailyTopicsResult => {
                  this.dailyTopicsOfSelectedStudent = [];

                  dailyTopicsResult.dailyTopics.map(dailyTopic => {
                    this.dailyTopicsOfSelectedStudent.push(dailyTopic);
                  });
                });
            }
          });
        });
        break;
      case 'contact':
        dialogRef = this.dialog.open(AddContactDialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          this.contactService.addContact(result).subscribe(() => {
            if (result) {
              this.contactService.getContactsByStudent(this.selectedStudent.getIdPerson())
                .subscribe(contactsResult => {
                  this.contactsOfSelectedStudent = [];

                  contactsResult.contacts.map(contact => {
                    this.contactsOfSelectedStudent.push(contact);
                  });
                });
            }
          });
        });
        break;
    }
  }

  displaySendEmailDialog(): void {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.width = '60%';
    matDialogConfig.data = this.selectedStudent;

    dialogRef = this.dialog.open(SendEmailDialogComponent, matDialogConfig);
  }

  updateStudentModal() {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.maxHeight = '90vh';
    matDialogConfig.data = this.selectedStudent;

    dialogRef = this.dialog.open(UpdateStudentDialogComponent, matDialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const idPerson = this.selectedStudent.getIdPerson();
        result.setIdPerson(idPerson);
        this.studentService.updateStudent(result).subscribe(() => {
            this.selectedStudent = result;
          },
          err => {
            console.log(err);
          });
      }
    });
  }

  setSelectedCourse(selectedCourse: Course): void {
    this.selectedCourse = selectedCourse;
  }

  setIsLearningAgreementValid(): void {
    this.selectedStudent.setIsLearningAgreementValid(
      this.selectedStudent.getIsLearningAgreementValid() === 'false' ? 'true' : 'false'
    );
    this.selectedStudent.setDateLearningAgreementValid(new Date());
    this.studentService.updateLAStudent(this.selectedStudent).subscribe(
      () => {
        this.setCourses();
      },
      err => {
        console.log(err);
        this.setCourses();
      }
    );
  }

  getNbEcts(): string {
    let nbEcts = '0';

    this.coursesOfSelectedStudent.forEach(courseOfSelectedStudent => {
      nbEcts = nbEcts + courseOfSelectedStudent.getEcts();
    });

    return nbEcts;
  }

  goToStudentList(): void {
    this.router.navigate(['home']);
  }

  async generatePDF() {
    html2canvas(this.contentPdf.nativeElement, { scale: 1 }).then(canvas => {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = this.contentPdf.nativeElement.offsetWidth / pdf.internal.pageSize.getWidth() * 23;
      const height = this.contentPdf.nativeElement.offsetHeight / pdf.internal.pageSize.getHeight() * 30;
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, width, height);
      pdf.save(`${this.selectedStudent.getFirstName()}_${this.selectedStudent.getLastName()}-${new Date().toLocaleDateString()}`);
    });
  }

  deleteCourse(idCourse: string) {
    const isCourseInLA = this.coursesOfSelectedStudentNotRejected.find(course => course.getIdCourse() === idCourse);

    this.courseService.deleteCourse(idCourse).subscribe(() => {
      this.setCourses();

      if (isCourseInLA && this.selectedStudent.getIsLearningAgreementValid() === 'true') {
        this.setIsLearningAgreementValid();
      }
    });
  }

  rejectCourse(idCourse: string) {
    this.courseService.rejectCourse(idCourse).subscribe(() => {
      this.setCourses();

      if (this.selectedStudent.getIsLearningAgreementValid() === 'true') {
        this.setIsLearningAgreementValid();
      }
    });
  }

  deleteDailyTopic(idDailyTopic: string) {
    this.dailyTopicService.deleteDailyTopic(idDailyTopic).subscribe(() => {

      this.dailyTopicService.getDailyTopicsByStudent(this.selectedStudent.getIdPerson())
        .subscribe(dailyTopicsResult => {
          this.dailyTopicsOfSelectedStudent = [];

          dailyTopicsResult.dailyTopics.map(dailyTopic => {
            this.dailyTopicsOfSelectedStudent.push(dailyTopic);
          });
        });

    });
  }

  deleteContact(idContact: string) {
    this.contactService.deleteContact(idContact).subscribe(() => {

      this.contactService.getContactsByStudent(this.selectedStudent.getIdPerson())
        .subscribe(contactsResult => {
          this.contactsOfSelectedStudent = [];
          this.coursesOfSelectedStudentNotRejected = [];

          contactsResult.contacts.map(contact => {
            this.contactsOfSelectedStudent.push(contact);
          });
        });

    });
  }

  updateDailtTopic(): void {
    this.administratorService.updateDailyTopicOnSeeForAStudent(this.selectedStudent.getIdPerson()).subscribe();
  }

  setCourses() {
    this.courseService.getCoursesByStudent(this.selectedStudent.getIdPerson())
      .subscribe(coursesResult => {
        this.isLAPending = false;

        this.coursesOfSelectedStudent = [];
        this.coursesOfSelectedStudentNotRejected = [];

        coursesResult.courses.map(course => {
          this.coursesOfSelectedStudent.push(course);

          if (course.getState() === 'pending') {
            this.isLAPending = true;
          }

          if (course.getState() !== 'rejected') {
            this.coursesOfSelectedStudentNotRejected.push(course);
          }

          this.markService.getMarksByStudent(course.getIdCourse(), this.selectedStudent.getIdPerson())
            .subscribe(marks => {
              this.marks = [];
              const marksByCourse = { idCourse: course.getIdCourse(), marks: [] };
              marks['marks'].forEach(mark => marksByCourse.marks.push(mark));
              this.marks.push(marksByCourse);
            });
        });
      });

    this.marks.push({ idCourse: '', marks: [] });
  }

  switchLanguage($event: string) {
    this.setLanguage.emit($event);
  }
}
