import { TestBed } from '@angular/core/testing';

import { PopupSnackbarService } from './popup-snackbar.service';

describe('PopupSnackbarService', () => {
  let service: PopupSnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopupSnackbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
