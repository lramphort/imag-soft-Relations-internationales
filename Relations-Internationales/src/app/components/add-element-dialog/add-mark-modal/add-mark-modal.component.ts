import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-mark-modal',
  templateUrl: './add-mark-modal.component.html',
  styleUrls: ['./add-mark-modal.component.css']
})
export class AddMarkModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<AddMarkModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  /**
   * Le ngOnInit est exécuté au moment où le composant se charge. Juste après le constructeur
   */
  ngOnInit() {
  }

  /**
   * Retourne True si el est rempli
   * @param el: Un élement
   */
  isFieldFiled(el: any) {
    return (el as string).length > 0;
  }

  /**
   * sauvegarde les informations
   */
  save() {
    if (this.isFormValid()) {
      this.dialog.close(this.data);
    }
  }

  /**
   * Retourne True si le formulaire est valide
   */
  isFormValid() {
    return this.isFieldFiled(this.data.mark);
  }

}
