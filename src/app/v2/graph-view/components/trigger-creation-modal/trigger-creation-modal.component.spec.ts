import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TriggerCreationModalComponent } from './trigger-creation-modal.component';

describe('TriggerCreationModalComponent', () => {
  let component: TriggerCreationModalComponent;
  let fixture: ComponentFixture<TriggerCreationModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TriggerCreationModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TriggerCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
