import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from 'src/app/models/student';
import { DailyTopic } from 'src/app/models/daily-topic';

@Component({
  selector: 'app-add-daily-topic-dialog',
  templateUrl: './add-daily-topic-dialog.component.html',
  styleUrls: ['./add-daily-topic-dialog.component.css']
})
export class AddDailyTopicDialogComponent implements OnInit {

  /**
   * Avec les ngModel dans le html, les champs suivants sont mis à jour automatiquement
   */
  description: string;
  name: string;

  isFormValid: boolean;
  isNameValid: boolean;
  isDescriptionValid: boolean;

  /**
   *
   * @param dialogRef: Le composant gérant la modal
   * @param injectedStudent: L'étudiant envoyé à la modal
   */
  constructor(private dialogRef: MatDialogRef<AddDailyTopicDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public injectedStudent: Student) { }

    /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
    this.isFormValid = true;
  }

  createDailyTopic(): void {
    if (this.checkForm()) {
      const newDailyTopic = new DailyTopic({
        dateDailyTopic: new Date(),
        description: this.description || 'no description',
        name: this.name,
        idPerson: this.injectedStudent.getIdPerson()
      });

      /**
       * newDailyTopic est récupéré dans le composant qui a appelé ce composant. Par exemple StudentDetailsComponent
       */
      this.dialogRef.close(newDailyTopic);
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

    if (this.description && this.description.length > 0) {
      this.isDescriptionValid = true;
    } else {
      this.isDescriptionValid = false;
      this.isFormValid = false;
    }

    return this.isFormValid;
  }

}
