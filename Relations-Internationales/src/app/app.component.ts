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

  /**
   *
   * @param administratorService: Service gérant les administrateurs
   * @param translate: Composant gérant la translation sur le site
   */
  constructor(private readonly administratorService: AdministratorService, private translate: TranslateService) {
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

  /**
   * Permet de récupérer l'event qui change de langue.
   * @param elementRef
   */
  onActivate(elementRef) {
    elementRef.setLanguage.subscribe(event => {
      /**
       * Utilise la translation anglaise ou française
       */
      this.translate.use(event);
    });
  }
}
