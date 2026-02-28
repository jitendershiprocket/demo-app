import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  parseIds(jsonStr: string): number[] {
    try {
      const obj = JSON.parse(jsonStr);
      return obj.ids ?? [];
    } catch {
      return [];
    }
  }
}