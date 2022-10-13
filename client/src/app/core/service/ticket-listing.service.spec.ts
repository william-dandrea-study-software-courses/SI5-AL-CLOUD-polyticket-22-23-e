import { TestBed } from '@angular/core/testing';

import { TicketListingService } from './ticket-listing.service';

describe('TicketListingService', () => {
  let service: TicketListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
