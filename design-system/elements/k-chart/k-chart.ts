import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  BubbleDataPoint,
  CategoryScale,
  Chart,
  ChartDataset,
  ChartType,
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
  ScatterDataPoint,
  SubTitle,
  TimeScale,
  TimeSeriesScale,
  Title,
  Tooltip,
} from 'chart.js';
import { ICustomElementViewModel, bindable } from 'aurelia';

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
export class KChart implements ICustomElementViewModel {
  @bindable type: ChartType = 'bar';
  @bindable labels?: string[];
  @bindable fill?: boolean;
  @bindable data: DataType[] | [DataType[]] = [];
  @bindable colors?: string[] | string;

  chart?: HTMLCanvasElement;
  chartJsInstance?: Chart<ChartType, (number | ScatterDataPoint | BubbleDataPoint | null)[], string>;

  createChart(): void {
    const dataSets: ChartDataset[] = [];
    if (!isNaN(this.data[0] as number)) {
      dataSets.push({ data: this.data as DataType[], backgroundColor: this.colors });
    }
    const context = this.chart?.getContext('2d');
    if (!context) return;

    this.chartJsInstance = new Chart(context, {
      type: this.type,
      data: {
        labels: this.labels,
        datasets: dataSets,
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        borderColor: 'transparent',
        plugins: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              pointStyle: 'circle',
              usePointStyle: true,
            },
          },
        },
      },
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
