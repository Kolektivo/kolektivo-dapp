import './chart-time-filter.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { Interval } from 'models/interval';
import { captureFilter } from '../../../design-system/common';
import template from './chart-time-filter.html';

@customElement({
  name: 'chart-time-filter',
  template,
  capture: captureFilter,
})
export class ChartTimeFilter implements ICustomElementViewModel {
  @bindable currentFilter = Interval['1d'];
  getButtonType(value: Interval | string, current: Interval) {
    return current === value || Interval[current] === value ? 'primary' : 'secondary';
  }
  changeFilter(interval: Interval) {
    this.currentFilter = Interval[interval] as unknown as Interval;
  }
}
