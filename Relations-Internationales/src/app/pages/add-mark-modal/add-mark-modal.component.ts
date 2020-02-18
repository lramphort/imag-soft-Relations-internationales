import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-mark-modal',
  templateUrl: './add-mark-modal.component.html',
  styleUrls: ['./add-mark-modal.component.css']
})
export class AddMarkModalComponent implements OnInit {

  constructor(public dialog: MatDialogRef<AddMarkModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  isFieldFiled(el: any) {
    return (el as string).length > 0;
  }

  save() {
    if (this.isFormValid()) {
      this.dialog.close(this.data);
    }
  }
  isFormValid() {
    return this.isFieldFiled(this.data.mark) &&
      this.isFieldFiled(this.data.typeMark);
  }

}
