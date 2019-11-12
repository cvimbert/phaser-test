import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTargetSelectionModalComponent } from './graph-target-selection-modal.component';

describe('GraphTargetSelectionModalComponent', () => {
  let component: GraphTargetSelectionModalComponent;
  let fixture: ComponentFixture<GraphTargetSelectionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphTargetSelectionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTargetSelectionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
