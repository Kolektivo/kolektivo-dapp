import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import { captureFilter } from '../../../design-system/common';
import { Interval } from '../../../models/interval';

import template from './chart-time-filter.html';

import './chart-time-filter.scss';

@customElement({
  name: 'chart-time-filter',
  template,
  capture: captureFilter,
})
export class ChartTimeFilter implements ICustomElementViewModel {
  @bindable currentFilter = Interval['1d'];
  getButtonType(value: Interval | string, current: Interval) {
    return current === value || Interval[current] === value ? 'primary' : 'utility-light-bordered';
  }
  changeFilter(interval: Interval) {
    this.currentFilter = Interval[interval] as unknown as Interval;
  }
}
