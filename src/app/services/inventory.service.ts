import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private items = [
    { id: 1, name: 'Widget A' },
    { id: 2, name: 'Widget B' },
  ];

  getItemNameAt(index: number): string {
    return this.items[index].name;
  }
}
