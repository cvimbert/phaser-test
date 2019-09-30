import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericValueComponent } from './numeric-value.component';

describe('NumericValueComponent', () => {
  let component: NumericValueComponent;
  let fixture: ComponentFixture<NumericValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumericValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
