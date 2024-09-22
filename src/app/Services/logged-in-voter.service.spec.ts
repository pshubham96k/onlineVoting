import { TestBed } from '@angular/core/testing';

import { LoggedInVoterService } from './logged-in-voter.service';

describe('LoggedInVoterService', () => {
  let service: LoggedInVoterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggedInVoterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
