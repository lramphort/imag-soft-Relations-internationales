import { Component, OnInit, Inject } from '@angular/core';
import { Student } from 'src/app/models/student';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-send-email-dialog',
  templateUrl: './send-email-dialog.component.html',
  styleUrls: ['./send-email-dialog.component.css']
})
export class SendEmailDialogComponent implements OnInit {

  /**
   * Avec les ngModel dans le html, les champs suivants sont mis à jour automatiquement
   */
  object: string;
  body: string;
  student: Student;

  /**
   *
   * @param dialogRef: Le composant gérant la modal
   * @param injectedStudent: L'étudiant envoyé à la modal
   */
  constructor(private dialogRef: MatDialogRef<SendEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

    /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.object = '';
    this.body = '';
    this.student = this.injectedStudent;
  }

  /**
   * Envoie le mail
   */
  sendEmail(): void {

    this.dialogRef.close({ object: this.object, body: this.body, email: this.student.getEmailAddress() });
  }

}
