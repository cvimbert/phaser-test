import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentsEditorModalComponent } from './arguments-editor-modal.component';

describe('ArgumentsEditorModalComponent', () => {
  let component: ArgumentsEditorModalComponent;
  let fixture: ComponentFixture<ArgumentsEditorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgumentsEditorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgumentsEditorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
