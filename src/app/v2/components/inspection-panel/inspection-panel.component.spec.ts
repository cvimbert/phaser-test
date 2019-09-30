import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionPanelComponent } from './inspection-panel.component';

describe('InspectionPanelComponent', () => {
  let component: InspectionPanelComponent;
  let fixture: ComponentFixture<InspectionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
