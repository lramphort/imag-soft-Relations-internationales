import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { Student } from 'src/app/models/student';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-student-dialog',
  templateUrl: './update-student-dialog.component.html',
  styleUrls: ['./update-student-dialog.component.css']
})
export class UpdateStudentDialogComponent implements OnInit {

  firstName: string;
  emailAddress: string;
  university: string;
  isEntrant: number;
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

  constructor(private readonly dialogRef: MatDialogRef<UpdateStudentDialogComponent>,
    private readonly datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
    this.firstName = data.getFirstName();
    this.emailAddress = data.getEmailAddress();
    this.university = data.getUniversity();
    this.isEntrant = +data.getIsEntrant();
    this.lastName = data.getLastName();
    this.phoneNumber = data.getPhoneNumber();
    this.birthDate = data.getBirthDate();

  }

  ngOnInit() {
    this.isFormValid = true;
  }

  createStudent(): void {
    if (this.checkForm()) {
      this.dialogRef.close(new Student({
        emailAddress: this.emailAddress,
        firstName: this.firstName,
        lastName: this.lastName,
        birthDate: this.datePipe.transform(this.birthDate, 'yyyy-MM-dd'),
        lastConnection: null,
        phoneNumber: this.phoneNumber,
        university: this.university,
        isEntrant: this.isEntrant ? 'true' : 'false',
        isArchived: 'false',
        isLearningAgreementValid: 'false',
        login: this.emailAddress,
        passWord: 'root'
      }));
    }
  }

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
