import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  parseIds(jsonStr: string): number[] {
    const obj = JSON.parse(jsonStr);
    return obj.ids ?? [];
  }
}
