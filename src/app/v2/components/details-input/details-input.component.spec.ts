import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsInputComponent } from './details-input.component';

describe('DetailsInputComponent', () => {
  let component: DetailsInputComponent;
  let fixture: ComponentFixture<DetailsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});