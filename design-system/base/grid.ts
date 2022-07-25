import { Alignable } from './alignable';
import { bindable } from 'aurelia';
import { numberToPixels } from '../common';

export abstract class Grid extends Alignable {
  @bindable({ set: numberToPixels }) gap: string;
  @bindable({ set: numberToPixels }) rowGap?: string;
  @bindable({ set: numberToPixels }) columnGap?: string;

  get gridStyle(): Record<string, string> {
    return {
      gap: this.gap,
      rowGap: this.rowGap,
      columnGap: this.columnGap,
      ...this.alignableStyle,
    };
  }
}
