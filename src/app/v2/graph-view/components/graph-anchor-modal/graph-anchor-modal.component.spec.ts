import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAnchorModalComponent } from './graph-anchor-modal.component';

describe('GraphAnchorModalComponent', () => {
  let component: GraphAnchorModalComponent;
  let fixture: ComponentFixture<GraphAnchorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphAnchorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAnchorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
