import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphAnchorComponent } from './graph-anchor.component';

describe('GraphAnchorComponent', () => {
  let component: GraphAnchorComponent;
  let fixture: ComponentFixture<GraphAnchorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphAnchorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphAnchorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
