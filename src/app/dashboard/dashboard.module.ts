// dashboard.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts/core';

// Components
import { DashboardComponent } from './dashboard.component';
import { QuickStatsComponent } from './components/quick-stats/quick-stats.component';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';
import { OccupancyChartComponent } from './components/occupancy-chart/occupancy-chart.component';

@NgModule({
  declarations: [
    DashboardComponent,
    QuickStatsComponent,
    BookingCalendarComponent,
    OccupancyChartComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    NgxEchartsModule.forRoot({ echarts }),
    RouterModule.forChild([
      { path: '', component: DashboardComponent }
    ])
  ]
})
export class DashboardModule {}
