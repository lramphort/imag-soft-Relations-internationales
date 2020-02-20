import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from 'src/app/models/student';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'app-add-course-dialog',
  templateUrl: './add-course-dialog.component.html',
  styleUrls: ['./add-course-dialog.component.css']
})
export class AddCourseDialogComponent implements OnInit {

  teachersToSelect = ['Teacher 1', 'Teacher 2', 'Teacher 3'];
  name: string;
  description: string;
  ects: number;
  teacherFullName: string;
  teacherEmail: string;
  semester: string;

  isNameValid: boolean;
  isEctsValid: boolean;
  isTeacherFullNameValid: boolean;
  isTeacherEmailValid: boolean;
  isFormValid: boolean;

  constructor(private dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

  ngOnInit() {
    this.isFormValid = true;
  }

  createCourse(): void {
    if (this.checkForm()) {
      const newCourse = new Course({
        name: this.name,
        description: this.description || 'no description',
        ects: this.ects,
        teacherFullName: this.teacherFullName,
        teacherEmail: this.teacherEmail,
        idPerson: this.injectedStudent.getIdPerson(),
        semester: this.semester || ''
      });

      this.dialogRef.close(newCourse);
    }
  }

  checkForm(): boolean {
    this.isFormValid = true;

    if (this.name && this.name.length > 0) {
      this.isNameValid = true;
    } else {
      this.isNameValid = false;
      this.isFormValid = false;
    }

    if (this.ects) {
      this.isEctsValid = true;
    } else {
      this.isEctsValid = false;
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

}
