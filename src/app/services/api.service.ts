import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ApiService {
  getStatus(response: { status: number } | null): number {
    return (response as { status: number }).status;
  }
}
