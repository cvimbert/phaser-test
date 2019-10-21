import { TestBed } from '@angular/core/testing';

import { DiffsService } from './diffs.service';

describe('DiffsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiffsService = TestBed.get(DiffsService);
    expect(service).toBeTruthy();
  });
});
