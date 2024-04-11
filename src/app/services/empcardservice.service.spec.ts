import { TestBed } from '@angular/core/testing';

import { EmpcardserviceService } from './empcardservice.service';

describe('EmpcardserviceService', () => {
  let service: EmpcardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpcardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
