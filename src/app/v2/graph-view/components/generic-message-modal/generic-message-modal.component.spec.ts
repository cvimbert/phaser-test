import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericMessageModalComponent } from './generic-message-modal.component';

describe('GenericMessageModalComponent', () => {
  let component: GenericMessageModalComponent;
  let fixture: ComponentFixture<GenericMessageModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericMessageModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericMessageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
