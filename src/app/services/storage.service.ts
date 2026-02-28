import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private store: Record<string, string> = {};

  getParsed(key: string): unknown {
    return JSON.parse(this.store[key]);
  }
}
