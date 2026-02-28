import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private items = [
    { id: 1, name: 'Widget A' },
    { id: 2, name: 'Widget B' },
  ];

  /**
   * Bug: Array index out of bounds - no check before access.
   * Triggers: getItemNameAt(5) → TypeError: Cannot read properties of undefined (reading 'name')
   */
  getItemNameAt(index: number): string {
    return this.items[index].name; // BUG: items[index] can be undefined
  }
}