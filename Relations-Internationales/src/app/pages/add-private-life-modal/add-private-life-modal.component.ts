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

  ngOnInit() {
  }

  save() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFieldFiled(el: any) {
    return (el as string).length > 0;
  }
  isFormValid() {
    return this.isFieldFiled(this.data.title) && this.isFieldFiled(this.data.description);
  }
}
