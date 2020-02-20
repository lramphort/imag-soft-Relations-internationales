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
      this.isFieldFiled(this.data.ects) &&
      this.isFieldFiled(this.data.semester);
  }
}
