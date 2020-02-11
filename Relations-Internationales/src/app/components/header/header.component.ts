<<<<<<< Updated upstream
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
=======
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() fullNameUser: string;
  @Output() setLanguage: EventEmitter<string> = new EventEmitter<string>();

  private currentLanguage: string;
  private languages: string[];

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
    console.log('Set the language to key ', event);
    this.currentLanguage = event.value;
  }

  switchLanguage(event) {
    this.setLanguage.emit(event.value);
    localStorage.setItem('language', event.value);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
}

}
