import { Student } from './../../models/student';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { AddCourseModalComponent } from '../add-course-modal/add-course-modal.component';
import { Course } from 'src/app/models/course';
import { DatePipe } from '@angular/common';
import { CourseDetailModalComponent } from '../course-detail-modal/course-detail-modal.component';
import { Contact } from 'src/app/models/contact';
import { AddContactModalComponent } from '../add-contact-modal/add-contact-modal.component';
import { DailyTopic } from 'src/app/models/daily-topic';
import { AddPrivateLifeModalComponent } from '../add-private-life-modal/add-private-life-modal.component';
import { MarkService } from 'src/app/services/back/mark.service';
import { ActivatedRoute } from '@angular/router';
import { Mark } from 'src/app/models/mark';
import { Poll } from 'src/app/models/poll';
import { PollService } from 'src/app/services/back/poll.service';
import { CourseService } from 'src/app/services/back/course.service';
import { ContactService } from 'src/app/services/back/contact.service';
import { DailyTopicsService } from 'src/app/services/back/daily-topics.service';



@Component({
  selector: 'app-student-profile-page',
  templateUrl: './student-profile-page.component.html',
  styleUrls: ['./student-profile-page.component.css']
})
export class StudentProfilePageComponent implements OnInit {

  name: String = '';
  ects: String = '';
  description: String = '';
  affiliation: String = '';
  mail: String = '';
  title: String = '';
  teacherName: string = '';
  codeUE: string = '';
  semester: string = '';
  markExpanded: boolean = true;

  coursesValidated: Course[] = [];
  coursesHystory: Course[] = [];

  dailyTopicLife: DailyTopic[] = [];
  dailyTopicCourse: DailyTopic[] = [];

  @Input() selectedStudent: Student = null;
  @Input() coursesOfSelectedStudent: Course[] = [];
  @Input() contactsOfSelectedStudent: Contact[] = [];
  @Input() dailyTopicsOfSelectedStudent: DailyTopic[] = [];

  private marks: { idCourse: string; marks: Mark[] }[] = [];

  displayedColumnsMark: string[] = ['name', 'teacher', 'ects', 'description', 'codeUE', 'semester', 'action'];
  displayedColumnsNotValidated: string[] = ['name', 'ects', 'description', 'codeUE', 'semester'];
  displayedColumnsPL: string[] = ['name', 'dateDailyTopic', 'description', 'action'];
  displayedTopicsCourses: string[] = ['name', 'dateDailyTopic', 'description', 'action'];
  displayedColumnsContact: string[] = ['lastName', 'description', 'affiliation', 'emailAddress', 'action'];

  dataSourceMark: MatTableDataSource<Course> = null;
  dataSourceNotValidated: MatTableDataSource<Course> = null;
  dataSourceTL: MatTableDataSource<DailyTopic> = null;
  dataSourceTC: MatTableDataSource<DailyTopic> = null;
  dataSourceContact: MatTableDataSource<Contact> = null;


  constructor(private activatedRoute: ActivatedRoute, public dialog: MatDialog, private datePipe: DatePipe,
    private readonly markService: MarkService, private readonly pollService: PollService, private courseService: CourseService,
    private contactService: ContactService, private dailyTopicService: DailyTopicsService) {

  }


  ngOnInit() {


    this.activatedRoute.data.subscribe(data => {
      this.coursesOfSelectedStudent.forEach(course => {
        if (course.getState() === 'rejected' || course.getState() === 'deleted') {
          this.coursesHystory.push(course);
        } else {
          this.coursesValidated.push(course);
        }
        this.markService.getMarksByStudent(course.getIdCourse(), this.selectedStudent.getIdPerson())
          .subscribe(result => {
            const marksByCourse = { idCourse: course.getIdCourse(), marks: [] };
            result['marks'].forEach(mark => marksByCourse.marks.push(mark));
            this.marks.push(marksByCourse);
          });
      });

      this.dailyTopicsOfSelectedStudent.forEach(dailyTopic => {
        if (dailyTopic.getType() === 'course') {
          this.dailyTopicCourse.push(dailyTopic);
        } else {
          this.dailyTopicLife.push(dailyTopic);
        }
      });

      this.dataSourceMark = new MatTableDataSource(this.coursesValidated);
      this.dataSourceNotValidated = new MatTableDataSource(this.coursesHystory);
      this.dataSourceTL = new MatTableDataSource(this.dailyTopicLife);
      this.dataSourceTC = new MatTableDataSource(this.dailyTopicCourse);
      this.dataSourceContact = new MatTableDataSource(this.contactsOfSelectedStudent);
    });
  }

  addCourse() {

    const newData = this.dataSourceMark.data;
    const dialogRef = this.dialog.open(AddCourseModalComponent, {
      width: '250px',
      disableClose: true,
      maxHeight: '90vh',
      data: {
        name: this.name, ects: this.ects, description: this.description,
        teacherName: this.teacherName, codeUE: this.codeUE, semester: this.semester, mail: this.mail
      }
    });


    dialogRef.afterClosed().subscribe(result => {

      const newCourse = new Course({
        idCourse: null,
        name: result.name ? result.name : ' ',
        description: result.description ? result.description : ' ',
        ects: result.ects ? result.ects : 0,
        teacherFullName: result.teacherName ? result.teacherName : ' ',
        teacherEmail: result.mail ? result.mail : ' ',
        idPerson: this.selectedStudent.getIdPerson(),
        codeUE: result.codeUE ? result.codeUE : ' ',
        semester: result.semester ? result.semester : 0
      });
      newData.push(newCourse);
      this.dataSourceMark.data = newData;
      this.courseService.addCourse(newCourse).subscribe();

    });
  }


  openDetailCourse(course: Course) {
    const dialogCourse = this.dialog.open(CourseDetailModalComponent, {
      width: '90%',
      maxHeight: '90vh',
      data: { course: course, idStudent: this.selectedStudent.getIdPerson() }
    });
  }

  addContact() {

    const newData = this.dataSourceContact.data;
    const dialogRef = this.dialog.open(AddContactModalComponent, {
      width: '250px',
      disableClose: true,
      maxHeight: '90vh',
      data: { name: this.name, description: this.description, affiliation: this.affiliation, mail: this.mail }
    });

    dialogRef.afterClosed().subscribe(result => {
      const newContact = new Contact({
        idContact: null,
        idPerson: this.selectedStudent.getIdPerson(),
        emailAddress: result.mail,
        firstName: ' ',
        lastName: result.name,
        phoneNumber: ' ',
        affiliation: result.affiliation,
        description: result.description
      });
      newData.push(newContact);
      this.dataSourceContact.data = newData;
      this.contactService.addContact(newContact).subscribe();

    });


  }

  addPrivateLife() {
    const newData = this.dataSourceTL.data;
    const dialogRef = this.dialog.open(AddPrivateLifeModalComponent, {
      width: '250px',
      disableClose: true,
      maxHeight: '90vh',
      data: { title: this.title, description: this.description }
    });

    dialogRef.afterClosed().subscribe(result => {

      const newDailyTopic = new DailyTopic({
        idDailyTopic: '',
        dateDailyTopic: new Date(),
        description: result.description,
        name: result.title,
        idPerson: this.selectedStudent.getIdPerson(),
        type: 'privateLife'
      });

      newData.push(newDailyTopic);
      this.dataSourceTL.data = newData;
      this.dailyTopicService.addDailyTopic(newDailyTopic).subscribe();
    });
  }

  addTopicsCourses() {
    const newData = this.dataSourceTL.data;
    const dialogRef = this.dialog.open(AddPrivateLifeModalComponent, {
      width: '250px',
      disableClose: true,
      maxHeight: '90vh',
      data: { title: this.title, description: this.description }
    });

    dialogRef.afterClosed().subscribe(result => {

      const newDailyTopic = new DailyTopic({
        idDailyTopic: '',
        dateDailyTopic: new Date(),
        description: result.description,
        name: result.title,
        idPerson: this.selectedStudent.getIdPerson(),
        type: 'course'
      });

      newData.push(newDailyTopic);
      this.dataSourceTL.data = newData;
      this.dailyTopicService.addDailyTopic(newDailyTopic).subscribe();
    });
  }

  delCourse(course: Course) {
    const newData = this.dataSourceMark.data;
    newData.splice(newData.indexOf(course), 1);
    this.dataSourceMark.data = newData;

    this.courseService.deletedCourse(course.getIdCourse()).subscribe();

    const hystoData = this.dataSourceNotValidated.data;
    hystoData.push(course);
    this.dataSourceNotValidated.data = hystoData;
  }

  delTopicLife(topic: DailyTopic) {
    const newData = this.dataSourceTL.data;
    newData.splice(newData.indexOf(topic), 1);
    this.dataSourceTL.data = newData;

    this.dailyTopicService.deleteDailyTopic(topic.getIdDailyTopic()).subscribe();
  }

  delTopicCourse(topic: DailyTopic) {
    const newData = this.dataSourceTL.data;
    newData.splice(newData.indexOf(topic), 1);
    this.dataSourceTL.data = newData;

    this.dailyTopicService.deleteDailyTopic(topic.getIdDailyTopic()).subscribe();
  }

  delContact(contact: Contact) {
    const newData = this.dataSourceContact.data;
    newData.splice(newData.indexOf(contact), 1);
    this.dataSourceContact.data = newData;

    this.contactService.deleteContact(contact.getIdContact()).subscribe();
  }

}

// TODO : Remettre Daily topics life et daily topic course. Synchroniser avec admin. Permettre admin d'ajouter mark. Modification
