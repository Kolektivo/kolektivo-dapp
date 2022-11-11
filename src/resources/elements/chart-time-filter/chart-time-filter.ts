import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import { captureFilter } from '../../../design-system/common';

import template from './chart-time-filter.html';

import './chart-time-filter.scss';

import { Interval } from 'models/interval';

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
