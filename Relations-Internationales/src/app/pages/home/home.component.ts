import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Administrator } from 'src/app/models/administrator';
import { AdministratorService } from 'src/app/services/back/administrator.service';
import { Student } from 'src/app/models/student';
import { StudentService } from 'src/app/services/back/student.service';
import { Course } from 'src/app/models/course';
import { Contact } from 'src/app/models/contact';
import { DailyTopic } from 'src/app/models/daily-topic';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userConnected: Student | Administrator;
  isAdministrator: any;
  students: Student[] = [];
  fullNameUser: string;

  selectedStudent: Student;
  coursesOfSelectedStudent: Course[];
  contactsOfSelectedStudent: Contact[];
  dailyTopicsOfSelectedStudent: DailyTopic[];

  @Output() setLanguage: EventEmitter<string> = new EventEmitter<string>();


  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly studentService: StudentService, private translate: TranslateService) {
  }

  ngOnInit() {
    this.isAdministrator = localStorage.getItem('type') === 'administrator';

    this.activatedRoute.data.subscribe(data => {
      this.userConnected = this.isAdministrator
        ? new Administrator(data['loginResolverResult'][0])
        : new Student(data['loginResolverResult'][0]);

      this.students = this.userConnected instanceof Administrator
        ? data['studentsResolverResult']['students']
        : null;

      this.fullNameUser = this.userConnected.getFirstName() + ' ' + this.userConnected.getLastName();

      this.selectedStudent = data.studentResolverResult[0];
      this.coursesOfSelectedStudent = data.coursesResolverResult['courses'];
      this.contactsOfSelectedStudent = data.contactsResolverResult['contacts'];
      this.dailyTopicsOfSelectedStudent = data.dailyTopicsResolverResult['dailyTopics'];
    });
  }

  switchLanguage(event) {
    this.setLanguage.emit(event);
  }
}
