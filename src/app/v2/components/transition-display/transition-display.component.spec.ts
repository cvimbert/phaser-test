import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransitionDisplayComponent } from './transition-display.component';

describe('TransitionDisplayComponent', () => {
  let component: TransitionDisplayComponent;
  let fixture: ComponentFixture<TransitionDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransitionDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransitionDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
