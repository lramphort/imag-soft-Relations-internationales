import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMarkModalComponent } from './add-mark-modal.component';

describe('AddMarkModalComponent', () => {
  let component: AddMarkModalComponent;
  let fixture: ComponentFixture<AddMarkModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMarkModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMarkModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
