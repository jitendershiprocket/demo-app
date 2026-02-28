import { Component, Input } from '@angular/core';
import { calculateSubtotal } from './order-card.helper';

@Component({
  selector: 'app-order-card',
  standalone: true,
  template: `<div class="order-card">{{ getSubtotal() }}</div>`,
  styles: ['.order-card { padding: 8px; }'],
})
export class OrderCardComponent {
  @Input() items?: { price: number }[];

  getSubtotal(): string {
    return calculateSubtotal(this.items).toFixed(2);
  }
}
