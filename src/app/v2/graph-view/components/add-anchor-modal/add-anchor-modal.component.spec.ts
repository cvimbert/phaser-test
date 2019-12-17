import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnchorModalComponent } from './add-anchor-modal.component';

describe('AddAnchorModalComponent', () => {
  let component: AddAnchorModalComponent;
  let fixture: ComponentFixture<AddAnchorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAnchorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAnchorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
