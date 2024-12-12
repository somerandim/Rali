import { TestBed } from '@angular/core/testing';

import { PublicbookingService } from './publicbooking.service';

describe('PublicbookingService', () => {
  let service: PublicbookingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicbookingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
