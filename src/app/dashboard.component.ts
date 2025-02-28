// dashboard.component.ts
import { Component } from '@angular/core';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-grid">
      <app-quick-stats [metrics]="metrics"></app-quick-stats>
      <div class="main-content">
        <div class="booking-list">
          <div *ngFor="let booking of bookings" class="booking-card">
            {{ booking.room }} - {{ booking.dates.join(' to ') }}
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  metrics: any;
  bookings: any[] = [];

  constructor(private dashboardService: DashboardService) {
    this.dashboardService.getData().subscribe(data => {
      this.metrics = data.metrics;
      this.bookings = data.bookings;
    });
  }
}

