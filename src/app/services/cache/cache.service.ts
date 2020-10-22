import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Cache } from './cache';
import { CacheEntry, MAX_CACHE_AGE } from './cache-entry';

@Injectable()
export class CacheService implements Cache {

  cacheMap = new Map<string, CacheEntry>();

  get(request: HttpRequest<any>): HttpResponse<any> | null {
    const entry = this.cacheMap.get(request.urlWithParams);
    if (!entry) {
      return null;
    }
    const isExpired = (Date.now() - entry.entryTime) > MAX_CACHE_AGE;
    return isExpired ? null : entry.response;
  }

  put(request: HttpRequest<any>, response: HttpResponse<any>): void {
    const entry: CacheEntry = { url: request.urlWithParams, response: response, entryTime: Date.now() };
    this.cacheMap.set(request.urlWithParams, entry);
    this.deleteExpiredCache();
  }

  private deleteExpiredCache() {
    this.cacheMap.forEach(entry => {
      if ((Date.now() - entry.entryTime) > MAX_CACHE_AGE) {
        this.cacheMap.delete(entry.url);
      }
    })
  }

}