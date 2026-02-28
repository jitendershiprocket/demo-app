import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private store: Record<string, string> = {};

  getParsed(key: string): unknown {
    const value = this.store[key];
    return value !== undefined ? JSON.parse(value) : undefined;
  }
}