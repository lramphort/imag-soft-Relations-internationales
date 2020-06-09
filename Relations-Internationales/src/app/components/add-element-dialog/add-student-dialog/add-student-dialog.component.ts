import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Student } from 'src/app/models/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './add-student-dialog.component.html',
  styleUrls: ['./add-student-dialog.component.css']
})
export class AddStudentDialogComponent implements OnInit {

   /**
   * Avec les ngModel dans le html, les champs suivants sont mis à jour automatiquement
   */
  firstName: string;
  emailAddress: string;
  university: string;
  isEntrant = 'true';
  lastName: string;
  phoneNumber: string;
  birthDate: Date;

  isFormValid: boolean;
  isFirstNameValid: boolean;
  isEmailAddressValid: boolean;
  isUniversityValid: boolean;
  isEntrantValid: boolean;
  isLastNameValid: boolean;
  isPhoneNumberValid: boolean;
  isBirthDateValid: boolean;

  /**
   *
   * @param dialogRef: Le composant gérant le modal
   * @param datePipe: Permet d'ajouter un pipe pour traiter les dates
   */
  constructor(private readonly dialogRef: MatDialogRef<AddStudentDialogComponent>,
    private readonly datePipe: DatePipe) { }

     /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.isFormValid = true;
  }

  createStudent(): void {
    if (this.checkForm()) {
      /**
       * Student est récupéré dans le composant qui a appelé ce composant. Par exemple AdministratorSideComponent
       */
      this.dialogRef.close(new Student({
        emailAddress: this.emailAddress,
        firstName: this.firstName,
        lastName: this.lastName,
        /**
         * Transforme le format de la date
         */
        birthDate: this.datePipe.transform(this.birthDate, 'yyyy-MM-dd'),
        lastConnection: null,
        phoneNumber: this.phoneNumber,
        university: this.university,
        isEntrant: this.isEntrant === 'true' ? 'true' : 'false',
        isArchived: 'false',
        isLearningAgreementValid: 'false',
        login: this.emailAddress,
        passWord: 'root'
      }));
    }
  }

  /**
   * Vérifie que les informations du formulaire sont correctement renseignées
   */
  checkForm(): boolean {
    this.isFormValid = true;

    if (this.firstName && this.firstName.length > 0) {
      this.isFirstNameValid = true;
    } else {
      this.isFirstNameValid = false;
      this.isFormValid = false;
    }

    if (this.lastName && this.lastName.length > 0) {
      this.isLastNameValid = true;
    } else {
      this.isLastNameValid = false;
      this.isFormValid = false;
    }

    if (this.emailAddress && this.emailAddress.length > 0) {
      this.isEmailAddressValid = true;
    } else {
      this.isEmailAddressValid = false;
      this.isFormValid = false;
    }

    if (this.university && this.university.length > 0) {
      this.isUniversityValid = true;
    } else {
      this.isUniversityValid = false;
      this.isFormValid = false;
    }

    if (this.phoneNumber && this.phoneNumber.length > 0) {
      this.isPhoneNumberValid = true;
    } else {
      this.isPhoneNumberValid = false;
      this.isFormValid = false;
    }

    if (this.birthDate) {
      this.isBirthDateValid = true;
    } else {
      this.isBirthDateValid = false;
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

}
