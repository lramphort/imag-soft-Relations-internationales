import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-course-modal',
  templateUrl: './add-course-modal.component.html',
  styleUrls: ['./add-course-modal.component.css']
})
export class AddCourseModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
  }

  /**
   * ferme le modal
   */
  onQuit(): void {
    this.dialogRef.close();
  }

  /**
   * Retourne True si el est rempli
   * @param el: Un élement
   */
  isFieldFiled(el: any) {
    return (el as string).length > 0;
  }

  /**
   * Sauvegarde les informations
   */
  save() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.data);
    }
  }

  /**
   * Renvoie True si le formulaire est valide
   */
  isFormValid() {
    return this.isFieldFiled(this.data.name) &&
      this.isFieldFiled(this.data.ects) &&
      this.isFieldFiled(this.data.semester);
  }
}
