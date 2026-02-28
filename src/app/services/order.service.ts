import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private orders: Record<number, { customer?: { name: string } }> = {
    1: { customer: { name: 'Alice' } },
    2: { customer: { name: 'Bob' } },
  };
  // orderId 999 does not exist -> order undefined

  getCustomerName(orderId: number): string {
    const order = this.orders[orderId];
    return (order as { customer: { name: string } }).customer.name;
  }
}
