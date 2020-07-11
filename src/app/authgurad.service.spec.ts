import { TestBed } from '@angular/core/testing';

import { AuthguradService } from './authgurad.service';

describe('AuthguradService', () => {
  let service: AuthguradService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthguradService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
