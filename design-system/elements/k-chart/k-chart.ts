import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  BubbleDataPoint,
  CategoryScale,
  Chart,
  ChartDataset,
  ChartOptions,
  ChartType,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
  LegendOptions,
  LineController,
  LineElement,
  LinearScale,
  LogarithmicScale,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  ScatterDataPoint,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import { ICustomElementViewModel, bindable, customElement, shadowCSS } from 'aurelia';
import { ifExistsThenTrue } from '../../common';

Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
);

export type DataType = number | ScatterDataPoint | BubbleDataPoint;
import css from './k-chart.scss';
import template from './k-chart.html';

@customElement({
  name: 'k-chart',
  template,
  capture: true,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KChart implements ICustomElementViewModel {
  @bindable type: ChartType = 'bar';
  @bindable cutout = 75;
  @bindable labels?: string[];
  @bindable data: DataType[] | [DataType[]] = [];
  @bindable dataSets: ChartDataset[] = [];
  @bindable colors?: string[] | string;
  @bindable borderColor?: string;
  @bindable backgroundColor?: string;
  @bindable tension?: number = 0.01;
  @bindable legend?: LegendOptions<ChartType>;
  @bindable({ set: ifExistsThenTrue }) hideLegend = false;
  @bindable({ set: ifExistsThenTrue }) fill?: boolean;

  chart?: HTMLCanvasElement;
  chartJsInstance?: Chart<ChartType, (number | ScatterDataPoint | BubbleDataPoint | null)[], string>;

  createChart(): void {
    if (!this.dataSets.length && !isNaN(this.data[0] as number)) {
      switch (this.type) {
        case 'doughnut':
          this.dataSets.push({
            data: this.data as DataType[],
            backgroundColor: this.colors,
            borderColor: this.borderColor,
          });
          break;
        case 'line':
          this.dataSets.push({
            label: this.labels?.[0],
            data: this.data as DataType[],
            borderColor: this.borderColor ?? 'red',
            backgroundColor: this.backgroundColor,
            tension: this.tension,
          });
          break;
      }
    }
    const context = this.chart?.getContext('2d');
    if (!context) return;

    const options: Chart['options'] = {
      responsive: true,
      maintainAspectRatio: false,
      borderColor: 'transparent',
      plugins: {
        legend: this.legend ?? {
          display: !this.hideLegend,
          position: 'right',
          labels: {
            pointStyle: 'circle',
            usePointStyle: true,
          },
        },
      },
    };

    if (this.type === 'doughnut') {
      (options as ChartOptions<'doughnut'>).cutout = `${this.cutout}%`;
    }

    this.chartJsInstance = new Chart(context, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: this.dataSets,
      },
      options,
    });
  }

  dataChanged(): void {
    this.chartJsInstance?.destroy();
    this.attaching();
  }

  attaching(): void {
    this.createChart();
  }

  detaching(): void | Promise<void> {
    this.chartJsInstance?.destroy();
  }
}
