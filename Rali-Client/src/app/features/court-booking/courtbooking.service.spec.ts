import { TestBed } from '@angular/core/testing';

import { CourtbookingService } from './courtbooking.service';

describe('CourtbookingService', () => {
  let service: CourtbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourtbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
