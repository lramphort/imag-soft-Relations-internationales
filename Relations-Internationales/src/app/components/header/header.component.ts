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
  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    /**
     * localStorage permet de stocker des informations sur l'ordinateur de l'utilisateur.
     * En rafraichissant la page, on peut se rappeler le langage que l'utilisateur avait choisit
     */
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

  /**
   * Permet de changer le langage. Les traductions sont dans /assets/i18n/*.json
   * @param event
   */
  switchLanguage(event) {
    this.setLanguage.emit(event.value);
    localStorage.setItem('language', event.value);
  }

  /**
   * Permet de naviguer sur le site.
   * @param route
   */
  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Se déconnecter
   */
  logout() {
    this.loginService.logOut();
    /**
     * Permet de naviguer sur le site. C'est une redirection sur la route /login.
     * https://im2ag-relations-internationales.univ-grenoble-alpes.fr/login
     */
    this.navigateTo('/login');
  }
}
