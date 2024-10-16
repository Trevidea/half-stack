import { TestBed } from '@angular/core/testing';

import { EventRunnerService } from './event-runner.service';

describe('EventRunnerService', () => {
  let service: EventRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
