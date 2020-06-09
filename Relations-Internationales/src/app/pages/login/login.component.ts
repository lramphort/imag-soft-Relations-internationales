import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import { StudentService } from 'src/app/services/back/student.service';
import { AdministratorService } from 'src/app/services/back/administrator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: string;
  passWord: string;
  logs: { idPerson: string; type: string };
  hasLoginFailed: boolean;

  constructor(private router: Router,
    private readonly studentService: StudentService,
    private readonly administratorService: AdministratorService) { }

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.login = '';
    this.passWord = '';
    this.logs = { idPerson: 'none', type: 'none' };
    this.hasLoginFailed = false;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  /**
   * Permet la connexion d'un étudiant ou d'un administrateur
   */
  connexion() {
    this.studentService.testLogs(this.login, this.passWord).subscribe(resultStudent => {
      if (resultStudent['result']) {
        this.hasLoginFailed = false;
        localStorage.setItem('idPerson', resultStudent['result']);
        localStorage.setItem('type', 'student');

        this.router.navigate(['home']);
        return;
      } else {
        this.administratorService.testLogs(this.login, this.passWord).subscribe(resultAdmin => {
          if (resultAdmin['result']) {
            this.hasLoginFailed = false;
            localStorage.setItem('idPerson', resultAdmin['result']);
            localStorage.setItem('type', 'administrator');

            this.router.navigate(['home']);
            return;
          }
          this.hasLoginFailed = true;
        });
      }
    });
  }
}
