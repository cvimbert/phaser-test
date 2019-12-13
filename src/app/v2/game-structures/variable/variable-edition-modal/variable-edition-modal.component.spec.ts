import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableEditionModalComponent } from './variable-edition-modal.component';

describe('VariableEditionModalComponent', () => {
  let component: VariableEditionModalComponent;
  let fixture: ComponentFixture<VariableEditionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariableEditionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariableEditionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
