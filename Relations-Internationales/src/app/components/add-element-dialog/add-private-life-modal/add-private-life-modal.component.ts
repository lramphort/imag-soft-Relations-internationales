import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-private-life-modal',
  templateUrl: './add-private-life-modal.component.html',
  styleUrls: ['./add-private-life-modal.component.css']
})
export class AddPrivateLifeModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddPrivateLifeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
  }

  /**
   * sauvegarde les informations
   */
  save() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.data);
    }
  }

  /**
   * ferme la modal
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
   * Renvoie True si le formulaire est valide
   */
  isFormValid() {
    return this.isFieldFiled(this.data.title) && this.isFieldFiled(this.data.description);
  }
}
