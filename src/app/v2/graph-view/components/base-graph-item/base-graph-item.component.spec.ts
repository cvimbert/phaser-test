import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseGraphItemComponent } from './base-graph-item.component';

describe('BaseGraphItemComponent', () => {
  let component: BaseGraphItemComponent;
  let fixture: ComponentFixture<BaseGraphItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseGraphItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseGraphItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
