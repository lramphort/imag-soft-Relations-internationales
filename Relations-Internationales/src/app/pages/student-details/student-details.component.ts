import { SimulatorService } from 'src/app/services/simulator/simulator.service';
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

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private simulator: SimulatorService, private activatedRoute: ActivatedRoute, private dialog: MatDialog, private markService: MarkService) { }
  @ViewChild('contentPdf') contentPdf: ElementRef;
  @Output() setLanguage: EventEmitter<string> = new EventEmitter<string>();

  private selectedStudent: Student;
  private coursesOfSelectedStudent: Course[];
  private contactsOfSelectedStudent: Contact[];
  private dailyTopicsOfSelectedStudent: DailyTopic[];
  // Simulator attributes
  private simulatedStudents: Student[];
  private simulatedCourses: Course[];
  private simulatedContacts: Contact[];
  private simulatedDailyTopics: DailyTopic[];

  ngOnInit() {
    this.simulatedStudents = [];
    this.simulatedCourses = [];
    this.simulatedContacts = [];
    this.simulatedDailyTopics = [];
    this.coursesOfSelectedStudent = [];
    this.contactsOfSelectedStudent = [];
    this.dailyTopicsOfSelectedStudent = [];

    this.simulator.getObjectsSimulated().forEach(lists => {
      lists.forEach(object => {
        if (object instanceof Student) { this.simulatedStudents.push(object); }
        if (object instanceof Course) { this.simulatedCourses.push(object); }
        if (object instanceof Contact) { this.simulatedContacts.push(object); }
        if (object instanceof DailyTopic) { this.simulatedDailyTopics.push(object); }
      });
    });

    this.activatedRoute.params.subscribe(params => {
      // TODO Faire getStudent(idPerson) depuis le back
      // TODO Faire getCourses(idPerson) depuis le back

      this.simulatedStudents.forEach(student => {
        // Recuperation du student selectionne
        if (student.getIdPerson() === params.idPerson) {
          this.selectedStudent = student;

          // Recuperation des cours du student selectionne
          this.simulatedCourses.forEach(course => {
            if (course.getStudent().getIdPerson() === this.selectedStudent.getIdPerson()) {
              this.coursesOfSelectedStudent.push(course);
            }
          });
          // Recuperation des contacts du student selectionne
          this.simulatedContacts.forEach(contact => {
            if (contact.getStudent().getIdPerson() === this.selectedStudent.getIdPerson()) {
              this.contactsOfSelectedStudent.push(contact);
            }
          });
          // Recuperation des contacts du student selectionne
          this.simulatedDailyTopics.forEach(dailyTopic => {
            if (dailyTopic.getStudent().getIdPerson() === this.selectedStudent.getIdPerson()) {
              this.dailyTopicsOfSelectedStudent.push(dailyTopic);
            }
          });
        }
      });
    });
  }

  displayAddElementDialog(dialogType: string): void {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.data = this.selectedStudent;

    switch (dialogType) {
      case 'course':
        console.log('Course dialog opened.');
        dialogRef = this.dialog.open(AddCourseDialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(result => console.log('Course dialog closed : ', result));
        break;
      case 'dailyTopic':
        console.log('DailyTopic dialog opened.');
        dialogRef = this.dialog.open(AddDailyTopicDialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(result => console.log('DailyTopic dialog closed : ', result));
        break;
      case 'contact':
        console.log('Contact dialog opened.');
        dialogRef = this.dialog.open(AddContactDialogComponent, matDialogConfig);
        dialogRef.afterClosed().subscribe(result => console.log('Contact dialog closed : ', result));
        break;
    }
  }

  displaySendEmailDialog(): void {
    let dialogRef = null;
    const matDialogConfig = new MatDialogConfig();
    matDialogConfig.autoFocus = true;
    matDialogConfig.width = '60%';
    matDialogConfig.data = this.selectedStudent;

    dialogRef = this.dialog.open(SendEmailDialogComponent, matDialogConfig);
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
