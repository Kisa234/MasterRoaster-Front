import { LegendElement } from './../../../../../node_modules/chart.js/dist/types/index.d';
import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {
  Chart,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  
} from 'chart.js';

@Component({
  selector: 'app-spider-graph',
  imports: [BaseChartDirective],
  templateUrl: './spider-graph.component.html',
  styles: ``
})
export class SpiderGraphComponent {

  constructor(){
    Chart.register(
      RadarController,
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Tooltip,
      Legend
    );
  }

  @Input() radarChartLabels: string[] = [];
  @Input() data: number[] = [];

  radarChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      r: {
        angleLines: { display: true },
        min: 5,
        max: 10,
        ticks: {
          stepSize: 1,
          display: false
        },
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  radarChartType: ChartType = 'radar';

  get radarChartData(): ChartConfiguration<'radar'>['data'] {
    return {
      labels: this.radarChartLabels,
      
      datasets: [
        {
          data: this.data,
          backgroundColor: 'rgba(59,130,246,0.2)', // Tailwind blue-500
          borderColor: 'rgb(59,130,246)',
          pointBackgroundColor: 'rgb(59,130,246)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgb(59,130,246)'
        }
      ]
    };
  }

}

