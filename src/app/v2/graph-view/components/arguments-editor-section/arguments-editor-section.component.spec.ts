import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArgumentsEditorSectionComponent } from './arguments-editor-section.component';

describe('ArgumentsEditorSectionComponent', () => {
  let component: ArgumentsEditorSectionComponent;
  let fixture: ComponentFixture<ArgumentsEditorSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArgumentsEditorSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArgumentsEditorSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
