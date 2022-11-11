import { bindable, customElement, ICustomElementViewModel } from 'aurelia';

import { captureFilter, uid } from '../../common';

export type ContentLoaderType = 'list' | 'code' | 'facebook' | 'instagram' | 'bullet-list';

import template from './k-skeleton.html';

@customElement({ name: 'k-skeleton', template, capture: captureFilter })
export class KSkeleton implements ICustomElementViewModel {
  @bindable type: ContentLoaderType = 'list';
  @bindable primaryColor = '#f9f9f9';
  @bindable animate = true;
  @bindable baseUrl = '';
  @bindable width = 400;
  @bindable height = 130;
  @bindable speed = 2;
  @bindable preserveAspectRatio = 'xMidYMid meet';
  @bindable secondaryColor = '#ecebeb';
  @bindable primaryOpacity = 1;
  @bindable secondaryOpacity = 1;
  @bindable uniqueKey?: string;
  @bindable rtl?: string;
  @bindable style?: string;
  @bindable ignoreBaseUrl = false;

  idClip = uid();
  idGradient = uid();

  defautlAnimation = ['-3; 1', '-2; 2', '-1; 3'];
  rtlAnimation = ['1; -3', '2; -2', '3; -1'];
  animationValues;

  constructor() {
    this.baseUrl = window.location.pathname;
    this.animationValues = this.rtl ? this.rtlAnimation : this.defautlAnimation;
  }

  public get fillStyle(): unknown {
    return {
      fill: `url(#${this.idGradient})`,
    };
  }

  public get clipStyle(): string {
    return `url(#${this.idClip})`;
  }
}
