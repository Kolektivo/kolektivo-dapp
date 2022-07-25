import { bindable } from 'aurelia';
import { numberToPixels } from './../common';

export abstract class Spaceable {
  @bindable({ set: numberToPixels }) padding?: CSSStyleDeclaration['padding'];
  @bindable({ set: numberToPixels }) paddingLeft?: CSSStyleDeclaration['paddingLeft'];
  @bindable({ set: numberToPixels }) paddingRight?: CSSStyleDeclaration['paddingRight'];
  @bindable({ set: numberToPixels }) paddingTop?: CSSStyleDeclaration['paddingTop'];

  @bindable({ set: numberToPixels }) margin?: CSSStyleDeclaration['margin'];
  @bindable({ set: numberToPixels }) marginLeft?: CSSStyleDeclaration['marginLeft'];
  @bindable({ set: numberToPixels }) marginRight?: CSSStyleDeclaration['marginRight'];
  @bindable({ set: numberToPixels }) marginTop?: CSSStyleDeclaration['marginTop'];

  get spaceStyle(): Record<string, string> {
    return {
      padding: this.padding,
      paddingLeft: this.paddingLeft,
      paddingRight: this.paddingRight,
      paddingTop: this.paddingTop,
      margin: this.margin,
      marginLeft: this.marginLeft,
      marginRight: this.marginRight,
      marginTop: this.marginTop,
    };
  }
}
