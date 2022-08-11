import './chart-time-filter.scss';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { captureFilter } from './../../../../design-system/common';
import template from './chart-time-filter.html';

@customElement({
  name: 'chart-time-filter',
  template,
  capture: captureFilter,
})
export class ChartTimeFilter implements ICustomElementViewModel {
  @bindable currentFilter = '1d';
  getButtonType(value: string, current: string) {
    return current === value ? 'primary' : 'secondary';
  }
}
