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
import { ICustomElementViewModel, IPlatform, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, ifExistsThenTrue } from '../../common';

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
  capture: captureFilter,
  dependencies: [shadowCSS(css)],
  shadowOptions: {
    mode: 'open',
  },
})
export class KChart implements ICustomElementViewModel {
  @bindable type: ChartType = 'bar';
  @bindable cutout = 75;
  @bindable options?: Chart['options'];
  @bindable labels?: string[];
  @bindable data: DataType[] | [DataType[]] = [];
  @bindable dataSets: ChartDataset[] = [];
  @bindable colors?: string[] | string;
  @bindable borderColor?: string;
  @bindable backgroundColor?: string;
  @bindable tension?: number = 0.01;
  @bindable maxLabels = 11;
  @bindable legend?: LegendOptions<ChartType>;
  @bindable({ set: ifExistsThenTrue }) hideLegend = false;
  @bindable({ set: ifExistsThenTrue }) fill?: boolean;

  chart?: HTMLCanvasElement;
  chartJsInstance?: Chart<ChartType, (number | ScatterDataPoint | BubbleDataPoint | null)[], string>;

  constructor(@IPlatform private readonly platform: IPlatform) {}

  createChart(): void {
    if (typeof this.colors !== 'string') {
      const style = this.platform.window.getComputedStyle(this.platform.document.body);

      this.colors = this.colors?.map((x) => {
        if (!x.includes('var(--')) return x;
        const variable = x.match(/var\((.*)\)/);
        if ((variable?.length ?? 0) < 2) return x;
        return style.getPropertyValue(variable?.[1] ?? '');
      });
    }

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
      hover: {
        intersect: false,
        includeInvisible: true,
      },
      interaction: {
        intersect: false,
        includeInvisible: true,
      },

      plugins: {
        legend: this.legend ?? {
          display: !this.hideLegend,
          position: 'right',
          labels: {
            pointStyle: 'line',
            color: 'red',
            usePointStyle: true,
          },
        },
      },
    };

    // assignDefined(options, this.options);

    if (this.type === 'doughnut') {
      (options as ChartOptions<'doughnut'>).cutout = `${this.cutout}%`;
    }

    if (this.type === 'line') {
      (options as ChartOptions<'line'>).scales = {
        x: {
          ticks: {
            maxTicksLimit: this.maxLabels,
          },
          grid: {
            display: false,
          },
        },
        y: {
          grid: {
            display: false,
          },
        },
      };
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
