import { TestBed } from '@angular/core/testing';

import { HttpinterceptorsInterceptor } from './httpinterceptors.interceptor';

describe('HttpinterceptorsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpinterceptorsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpinterceptorsInterceptor = TestBed.inject(HttpinterceptorsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
