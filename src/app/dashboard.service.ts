// dashboard.service.ts
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getData() {
    return of({
      metrics: {
        occupancy: 72,
        revenue: 24500
      },
      bookings: [
        { room: 'Deluxe Suite', dates: ['2025-03-01', '2025-03-05'] }
      ]
    });
  }
}
