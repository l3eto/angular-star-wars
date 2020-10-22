import { HttpResponse } from '@angular/common/http';

export interface CacheEntry {
    url: string;
    response: HttpResponse<any>
    entryTime: number;
}

export const MAX_CACHE_AGE = 5*60*1000; // 5minutes