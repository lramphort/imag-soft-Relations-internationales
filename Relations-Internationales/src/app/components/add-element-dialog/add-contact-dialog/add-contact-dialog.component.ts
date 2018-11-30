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

  firstName: string;
  lastName: string;
  student: Student;
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

  constructor(private dialogRef: MatDialogRef<AddContactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

  ngOnInit() {
    this.student = this.injectedStudent;
    this.isFormValid = true;
  }

  createContact(): void {
    if (this.checkForm()) {
      this.dialogRef.close(new Contact(null, this.student, this.emailAddress, this.firstName, this.lastName,
        this.phoneNumber, this.affiliation, this.description));
    }
  }

  checkForm(): boolean {

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
