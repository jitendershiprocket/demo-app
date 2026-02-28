import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ObjectUtilsService {
  getKeyCount(obj: Record<string, unknown> | null): number {
    return Object.keys(obj!).length;
  }
}
