import { bindable, customElement, ICustomElementViewModel, IPlatform, shadowCSS } from 'aurelia';

import { captureFilter, ifExistsThenTrue, numberToPixelsInterceptor } from '../../common';

import template from './k-chart.html';

import css from './k-chart.scss';

import type { BubbleDataPoint, Chart, ChartDataset, ChartOptions, ChartType, LegendOptions, ScatterDataPoint, TooltipOptions } from 'chart.js';

export type DataType = number | ScatterDataPoint | BubbleDataPoint;

let initialized = false;
const initializeChartJs = async () => {
  const chartJs = await import('chart.js');
  chartJs.Chart.register(
    chartJs.ArcElement,
    chartJs.LineElement,
    chartJs.BarElement,
    chartJs.PointElement,
    chartJs.BarController,
    chartJs.BubbleController,
    chartJs.DoughnutController,
    chartJs.LineController,
    chartJs.PieController,
    chartJs.PolarAreaController,
    chartJs.RadarController,
    chartJs.ScatterController,
    chartJs.CategoryScale,
    chartJs.LinearScale,
    chartJs.LogarithmicScale,
    chartJs.RadialLinearScale,
    chartJs.TimeScale,
    chartJs.TimeSeriesScale,
    chartJs.Decimation,
    chartJs.Filler,
    chartJs.Legend,
    chartJs.Title,
    chartJs.Tooltip,
    chartJs.SubTitle,
  );
  initialized = true;
};

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
  @bindable legend?: LegendOptions<ChartType>;
  @bindable({ set: ifExistsThenTrue }) hideLegend = false;
  @bindable({ set: ifExistsThenTrue }) fill?: boolean;
  @bindable({ set: ifExistsThenTrue }) gradient?: boolean;
  @bindable minY?: number;
  @bindable maxY?: number;
  @bindable tooltipOptions?: TooltipOptions;
  @bindable yLabelFormat?: Record<string, unknown>;
  @bindable xLabelFormat?: Record<string, unknown>;

  chart?: HTMLCanvasElement;
  public chartJsInstance?: Chart;
  creatingPromise?: Promise<void>;

  constructor(@IPlatform private readonly platform: IPlatform) {}

  async binding() {
    !initialized && (await initializeChartJs());
  }

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

  async createChart() {
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        tooltip: {
          backgroundColor: 'rgba(213, 92, 56, 1)',
          bodyColor: 'white',
          caretPadding: 6,
          usePointStyle: true,
          displayColors: false,
          intersect: false,
          ...this.tooltipOptions,
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
            maxRotation: 0,
            minRotation: 0,
            ...this.xLabelFormat,
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            maxTicksLimit: this.maxYLabels,
            maxRotation: 0,
            minRotation: 0,
            ...this.yLabelFormat,
          },
          max: this.maxY,
          min: this.minY,
          grid: {
            display: false,
          },
        },
      };
    }

    this.chartJsInstance = new (await import('chart.js')).Chart(context, {
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
                    const yAxis = chart.scales.y;
                    const ctx = chart.ctx;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, 10);
                    ctx.lineTo(x, yAxis.bottom);
                    ctx.lineWidth = 1;
                    ctx.setLineDash([2, 2]);
                    ctx.strokeStyle = 'rgba(76, 87, 92, 1)';
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
    this.refresh();
  }

  dataChanged(): void {
    this.refresh();
  }

  private refresh(): void {
    void this.detaching();
    this.attaching();
  }

  attaching(): void {
    this.creatingPromise = this.createChart();
  }

  async detaching() {
    await this.creatingPromise;
    this.chartJsInstance?.destroy();
  }
}
