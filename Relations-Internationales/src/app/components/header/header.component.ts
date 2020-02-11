import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() fullNameUser: string;
  @Output() setLanguage: EventEmitter<string> = new EventEmitter<string>();

  currentLanguage: string;
  languages: string[];

  constructor(private readonly router: Router, private readonly loginService: LoginService) {
  }

  ngOnInit() {
    if (localStorage.getItem('language') === null) {
      this.currentLanguage = 'en';
    } else {
      this.currentLanguage = localStorage.getItem('language');
    }
    this.languages = ['en', 'fr'];
  }

  changeLanguage(event): void {
    this.currentLanguage = event.value;
  }

  switchLanguage(event) {
    this.setLanguage.emit(event.value);
    localStorage.setItem('language', event.value);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.loginService.logOut();
    this.navigateTo('/login');
  }
}
