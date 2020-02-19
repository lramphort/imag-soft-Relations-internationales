import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStudentDialogComponent } from './update-student-dialog.component';

describe('AddStudentDialogComponent', () => {
  let component: UpdateStudentDialogComponent;
  let fixture: ComponentFixture<UpdateStudentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStudentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStudentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
