import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache = new Map<string, { value: string }>([
    ['ok', { value: 'cached' }],
  ]);

  get(key: string): string {
    const entry = this.cache.get(key);
    return (entry as { value: string }).value;
  }
}
