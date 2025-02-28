// dashboard.component.ts
import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  metrics: any;
  bookings: any[] = [];
  occupancyData: any[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getMetrics().subscribe(data => {
      this.metrics = data;
      this.occupancyData = this.transformChartData(data.occupancyTrend);
    });

    this.dashboardService.getBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  private transformChartData(rawData: any) {
    return [{
      name: 'Occupancy',
      type: 'line',
      data: rawData.map((d: any) => d.value)
    }];
  }
}
