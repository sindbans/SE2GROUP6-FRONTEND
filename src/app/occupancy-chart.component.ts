// occupancy-chart.component.ts
import { Component, Input } from '@angular/core';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-occupancy-chart',
  template: `<div echarts [options]="chartOptions" class="chart"></div>`
})
export class OccupancyChartComponent {
  @Input() set data(values: any[]) {
    this.chartOptions = {
      xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
      yAxis: { type: 'value', max: 100 },
      series: [{ data: values, type: 'line', smooth: true }],
      tooltip: { trigger: 'axis' }
    };
  }

  chartOptions: EChartsOption = {};
}
