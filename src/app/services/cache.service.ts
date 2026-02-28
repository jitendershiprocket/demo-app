import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CacheService {
  private cache = new Map<string, { value: string }>([
    ['a', { value: 'Alpha' }],
    ['b', { value: 'Beta' }],
  ]);

  get(key: string): string {
    const entry = this.cache.get(key);
    return (entry as { value: string }).value;
  }
}
