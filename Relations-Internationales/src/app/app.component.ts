import { Component } from '@angular/core';
import { Administrator } from './models/administrator';
import { AdministratorService } from './services/back/administrator.service';
import {TranslateService} from '@ngx-translate/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Relations-Internationales';
  private user: any;

  constructor(private readonly administratorService: AdministratorService, private translate: TranslateService) {
    // Todo A faire avec un resolver
    this.administratorService.getAdministrator('5').subscribe(resultPerson => {
      // const userStudent = this.simulator.getStudents()[0];
      this.user = new Administrator(resultPerson[0]);
    });
    if (localStorage.getItem('language') === null) {
      this.translate.setDefaultLang('en');
    } else {
      this.translate.setDefaultLang(localStorage.getItem('language'));
    }
  }

  onActivate(elementRef) {
    elementRef.setLanguage.subscribe(event => {
      this.translate.use(event);
    });
  }
}
