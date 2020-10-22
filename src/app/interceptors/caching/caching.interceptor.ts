import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from 'src/app/services/cache/cache.service';
import { tap } from 'rxjs/operators';

const CACHABLE_URL = "/api/starships";

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cacheService: CacheService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!this.isRequestCachable(request)) {
      return next.handle(request);
    }
    const cachedResponse = this.cacheService.get(request);
    if (cachedResponse !== null) {
      return of(cachedResponse);
    }
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.put(request, event);
        }
      })
    );
  }
  private isRequestCachable(request: HttpRequest<any>) {
    return (request.method === 'GET') && (request.url.indexOf(CACHABLE_URL) > -1);
  }
}
