import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrivateLifeModalComponent } from './add-private-life-modal.component';

describe('AddPrivateLifeModalComponent', () => {
  let component: AddPrivateLifeModalComponent;
  let fixture: ComponentFixture<AddPrivateLifeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPrivateLifeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPrivateLifeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
