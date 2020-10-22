import { TestBed } from '@angular/core/testing';
import { CacheService } from 'src/app/services/cache/cache.service';

import { CachingInterceptor } from './caching.interceptor';

describe('CachingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CacheService,
      CachingInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: CachingInterceptor = TestBed.inject(CachingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
