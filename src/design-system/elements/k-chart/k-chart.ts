import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Decimation,
  DoughnutController,
  Filler,
  Legend,
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
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';

import { ICustomElementViewModel, IPlatform, bindable, customElement, shadowCSS } from 'aurelia';
import { captureFilter, ifExistsThenTrue, numberToPixelsInterceptor } from '../../common';
import css from './k-chart.scss';
import template from './k-chart.html';
// eslint-disable-next-line no-duplicate-imports
import type { BubbleDataPoint, ChartDataset, ChartOptions, ChartType, LegendOptions, ScatterDataPoint } from 'chart.js';

export type DataType = number | ScatterDataPoint | BubbleDataPoint;

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
  @bindable({ set: numberToPixelsInterceptor }) height = 150;
  @bindable({ set: numberToPixelsInterceptor }) width?: string;
  @bindable tension?: number = 0.01;
  @bindable maxYLabels = 11;
  @bindable maxXLabels = 11;
  @bindable({ set: ifExistsThenTrue }) stacked = false;
  @bindable legend?: LegendOptions<ChartType>;
  @bindable({ set: ifExistsThenTrue }) hideLegend = false;
  @bindable({ set: ifExistsThenTrue }) fill?: boolean;
  @bindable({ set: ifExistsThenTrue }) gradient?: boolean;
  @bindable minY?: number;
  @bindable maxY?: number;

  chart?: HTMLCanvasElement;
  public chartJsInstance?: Chart<ChartType, (number | ScatterDataPoint | BubbleDataPoint | null)[], string>;

  constructor(@IPlatform private readonly platform: IPlatform) {}

  get styles() {
    return {
      height: this.height,
      width: this.width,
    };
  }

  get highestDataPoint(): number {
    const data = this.dataSets.flatMap((x) => x.data);
    data.sort();
    return data[data.length - 1] as unknown as number;
  }

  get lowestDataPoint(): number {
    const data = this.dataSets.flatMap((x) => x.data);
    data.sort();
    return data[0] as unknown as number;
  }

  createChart(): void {
    const ctx = this.chart?.getContext('2d');
    if (this.gradient && typeof this.dataSets[0].backgroundColor === 'string') {
      const gradient = ctx?.createLinearGradient(0, 0, 0, 400);
      gradient?.addColorStop(0, this.dataSets[0].backgroundColor);
      gradient?.addColorStop(1, 'rgba(255, 255, 255, 0.76) ');
      this.dataSets[0].backgroundColor = gradient;
    }
    if (typeof this.colors !== 'string') {
      const style = this.platform.window.getComputedStyle(this.platform.document.body);

      this.colors = this.colors?.map((x) => {
        if (!x.includes('var(--')) return x;
        const variable = x.match(/var\((.*)\)/);
        if ((variable?.length ?? 0) < 2) return x;
        return style.getPropertyValue(variable?.[1] ?? '');
      });
    }

    this.updateDataSets();
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
        mode: 'index',
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
        tooltip: {
          backgroundColor: 'rgba(213, 92, 56, 1)',
          bodyColor: 'white',
          caretPadding: 6,
          usePointStyle: true,
          displayColors: false,
          intersect: false,
          callbacks: this.stacked
            ? {
                label: (x) => {
                  switch (x.datasetIndex) {
                    case 0:
                      return `${x.dataset.label ?? ''}: ${x.raw as string}%`;
                    default:
                      return `${x.dataset.label ?? ''}: ${(x.raw as number) - (this.dataSets[x.datasetIndex - 1]?.data[x.dataIndex] as number)}%`;
                  }
                },
              }
            : undefined,
        },
      },
    };

    // assignDefined(options, this.options);

    if (this.type === 'doughnut') {
      (options as ChartOptions<'doughnut'>).cutout = `${this.cutout}%`;
    }

    if (this.type === 'line') {
      options.scales = {
        x: {
          ticks: {
            maxTicksLimit: this.maxXLabels,
          },
          grid: {
            display: false,
          },
        },
        y: {
          suggestedMin: this.lowestDataPoint - this.lowestDataPoint * 0.1,
          suggestedMax: this.highestDataPoint + this.highestDataPoint * 0.1,
          ticks: {
            maxTicksLimit: this.maxYLabels,
          },
          max: this.maxY,
          min: this.minY,
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
      plugins:
        this.type === 'line'
          ? [
              {
                id: 'chaddy-paddy',
                afterDraw: (chart) => {
                  const activeElements = chart.tooltip?.getActiveElements();
                  if (activeElements?.length) {
                    const x = activeElements[0]?.element.x;
                    const y = activeElements.map((y) => y.element.y).sort()[0];
                    const yAxis = chart.scales.y;
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(x, yAxis.bottom);
                    ctx.lineWidth = 1;
                    ctx.setLineDash([2, 2]);
                    ctx.strokeStyle = 'orange';
                    ctx.stroke();
                    ctx.restore();
                  }
                },
              },
            ]
          : [],
    });
  }

  private updateDataSets() {
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
  }

  dataSetsChanged(): void {
    if (!this.chartJsInstance?.options) return;
    this.chartJsInstance.data.datasets = this.dataSets;
    this.chartJsInstance.update();
  }

  dataChanged(): void {
    if (!this.chartJsInstance?.options) return;
    this.updateDataSets();
    this.chartJsInstance.data.datasets = this.dataSets;
    this.chartJsInstance.update();
  }

  attaching(): void {
    this.createChart();
  }

  detaching(): void | Promise<void> {
    this.chartJsInstance?.destroy();
  }
}
