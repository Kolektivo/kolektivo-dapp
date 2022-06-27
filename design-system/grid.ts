import { Alignable } from './alignable';
import { bindable } from 'aurelia';
import { numberToPixels } from './common';

export abstract class Grid extends Alignable {
  @bindable({ set: numberToPixels }) gap: string | number;
  @bindable({ set: numberToPixels }) rowGap?: string | number;
  @bindable({ set: numberToPixels }) columnGap?: string | number;
}
