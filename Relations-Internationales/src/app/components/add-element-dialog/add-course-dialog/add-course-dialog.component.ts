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

  /**
   * Avec les ngModel dans le html, les champs suivants sont mis à jour automatiquement
   */
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
  private isSemesterValid: boolean;

  /**
   *
   * @param dialogRef: Le composant gérant la modal
   * @param injectedStudent: L'étudiant envoyé à la modal
   */
  constructor(private dialogRef: MatDialogRef<AddCourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

    /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.isFormValid = true;
  }

  /**
   * Créé un cour
   */
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

      /**
       * newCourse est récupéré dans le composant qui a appelé ce composant. Par exemple StudentDetailsComponent
       */
      this.dialogRef.close(newCourse);
    }
  }

  /**
   * Vérifie que les informations du formulaire sont correctement renseignées
   */
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

    if (this.semester) {
      this.isSemesterValid = true;
    } else {
      this.isSemesterValid = false;
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

}
