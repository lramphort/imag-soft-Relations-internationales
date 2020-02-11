import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Administrator } from 'src/app/models/administrator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private user: Person;
  private isAdministrator: any;

  selectedStudent: Student;
  coursesOfSelectedStudent: Course[];
  contactsOfSelectedStudent: Contact[];
  dailyTopicsOfSelectedStudent: DailyTopic[];

  @Output() setLanguage: EventEmitter<string> = new EventEmitter<string>();


  constructor(private readonly activatedRoute: ActivatedRoute,
    private readonly studentService: StudentService, private translate: TranslateService) {
  }

  ngOnInit() {
    console.log('Welcome to the home component !');
    console.log(this.simulator.getObjectsSimulated());

    const userAdmin = this.simulator.getAdministrators()[0];
    const userStudent = this.simulator.getStudents()[0];

    this.user = userAdmin;
    this.isAdministrator = this.user instanceof Administrator;
  }

  switchLanguage(event) {
    this.setLanguage.emit(event);
  }
}
