import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-contact-modal',
  templateUrl: './add-contact-modal.component.html',
  styleUrls: ['./add-contact-modal.component.css']
})
export class AddContactModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddContactModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isFieldFiled(el: any) {
    return (el as string).length > 0;
  }

  save() {
    if (this.isFormValid()) {
      this.dialogRef.close(this.data);
    }
  }
  isFormValid() {
    return this.isFieldFiled(this.data.name) &&
      this.isFieldFiled(this.data.description) &&
      this.isFieldFiled(this.data.affiliation) &&
      this.isFieldFiled(this.data.mail);
  }
}
