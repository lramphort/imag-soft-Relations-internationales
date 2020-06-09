import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from 'src/app/models/student';
import { Contact } from 'src/app/models/contact';

@Component({
  selector: 'app-add-contact-dialog',
  templateUrl: './add-contact-dialog.component.html',
  styleUrls: ['./add-contact-dialog.component.css']
})
export class AddContactDialogComponent implements OnInit {

  /**
   * Avec les ngModel dans le html, les champs suivants sont mis à jour automatiquement
   */
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  affiliation: string;
  description: string;

  isFirstNameValid: boolean;
  isLastNameValid: boolean;
  isEmailAddressValid: boolean;
  isPhoneNumberValid: boolean;
  isAffiliationValid: boolean;
  isFormValid: boolean;

  /**
   *
   * @param dialogRef: Le composant gérant la modal
   * @param injectedStudent: L'étudiant envoyé à la modal
   */
  constructor(private dialogRef: MatDialogRef<AddContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.isFormValid = true;
  }

  /**
   * Créé un contact.
   */
  createContact(): void {
    if (this.checkForm()) {
      const newContact = new Contact({
        idPerson: this.injectedStudent.getIdPerson(),
        emailAddress: this.emailAddress,
        firstName: this.firstName,
        lastName: this.lastName,
        phoneNumber: this.phoneNumber,
        affiliation: this.affiliation,
        description: this.description
      });

      this.dialogRef.close(newContact);
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

    if (this.phoneNumber && this.phoneNumber.length < 10) {
      this.isPhoneNumberValid = true;
    } else {
      this.isPhoneNumberValid = false;
      this.isFormValid = false;
    }

    if (this.affiliation && this.affiliation.length > 0) {
      this.isAffiliationValid = true;
    } else {
      this.isAffiliationValid = false;
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

}
