import { Component } from '@angular/core';
<<<<<<< Updated upstream
import { SimulatorService } from './services/simulator/simulator.service';
import { Person } from './models/person';
=======
import { Administrator } from './models/administrator';
import { AdministratorService } from './services/back/administrator.service';
import {TranslateService} from '@ngx-translate/core';
import {el} from '@angular/platform-browser/testing/src/browser_util';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Relations-Internationales';
  private user: Person;

<<<<<<< Updated upstream
  constructor(private simulator: SimulatorService) {
    // Todo A faire avec un resolver
    const userAdmin = this.simulator.getAdministrators()[0];
    const userStudent = this.simulator.getStudents()[0];

    this.user = userAdmin;
=======
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
>>>>>>> Stashed changes
  }
}
