import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTimerModalComponent } from './graph-timer-modal.component';

describe('GraphTimerModalComponent', () => {
  let component: GraphTimerModalComponent;
  let fixture: ComponentFixture<GraphTimerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphTimerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTimerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
