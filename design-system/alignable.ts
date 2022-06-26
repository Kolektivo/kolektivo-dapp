import { bindable } from 'aurelia';

export abstract class Alignable {
  @bindable alignItems?: CSSStyleDeclaration['alignItems'];
  @bindable alignContent?: CSSStyleDeclaration['alignContent'];
  @bindable alignSelf?: CSSStyleDeclaration['alignSelf'];
  @bindable placeSelf?: CSSStyleDeclaration['placeSelf'];
  @bindable placeItems?: CSSStyleDeclaration['placeItems'];
  @bindable placeContent?: CSSStyleDeclaration['placeContent'];
  @bindable justifySelf?: CSSStyleDeclaration['justifySelf'];
  @bindable justifyItems?: CSSStyleDeclaration['justifyItems'];
  @bindable justifyContent?: CSSStyleDeclaration['justifyContent'];
}
