import { TestBed } from '@angular/core/testing';

import { SharingPreferencesService } from './sharing-preferences.service';

describe('SharingPreferencesService', () => {
  let service: SharingPreferencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharingPreferencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
