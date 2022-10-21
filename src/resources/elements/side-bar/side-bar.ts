import './side-bar.scss';
import { BindingMode, ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { I18N } from '@aurelia/i18n';
import { IRouter } from '@aurelia/router';
import { IS_DEV } from './../../../environment-variables';
import { ifExistsThenTrue } from '../../../design-system/common';
import template from './side-bar.html';

import logo from '../../../../static/logo.svg';

@customElement({ template, name: 'side-bar' })
export class SideBar implements ICustomElementViewModel {
  @bindable({ mode: BindingMode.twoWay }) open = true;
  @bindable({ set: ifExistsThenTrue }) collapsible = false;
  routes: RouteLink[] = [];
  logo = logo;

  constructor(@IRouter private readonly router: IRouter, @I18N private readonly i18n: I18N) {
    this.routes = [
      { name: this.i18n.tr('navigation.map.link-text'), path: 'map', location: 'top', icon: this.i18n.tr('navigation.map.link-icon') },
      { name: this.i18n.tr('navigation.treasury.link-text'), path: 'treasury', location: 'top', icon: this.i18n.tr('navigation.treasury.link-icon') },
      { name: this.i18n.tr('navigation.reserve.link-text'), path: 'reserve', location: 'top', icon: this.i18n.tr('navigation.reserve.link-icon') },
      // { name: this.i18n.tr('navigation.swap.link-text'), path: 'swap', location: 'top', icon: this.i18n.tr('navigation.swap.link-icon') },
      {
        name: this.i18n.tr('navigation.documentation.link-text'),
        path: 'documentation',
        location: 'bottom',
        icon: this.i18n.tr('navigation.documentation.link-icon'),
      },
      { name: this.i18n.tr('navigation.contact.link-text'), path: 'contact', location: 'bottom', icon: this.i18n.tr('navigation.contact.link-icon') },
      {
        name: this.i18n.tr('navigation.download-wallet.link-text'),
        path: 'download',
        location: 'bottom',
        icon: this.i18n.tr('navigation.download-wallet.link-icon'),
      },
      {
        name: this.i18n.tr('navigation.external-site.link-text'),
        path: 'cw',
        location: 'bottom',
        icon: this.i18n.tr('navigation.external-site.link-icon'),
      },
    ];
    if (IS_DEV) {
      this.routes.push({ name: 'Storybook', path: 'storybook', location: 'bottom', icon: 'menu_book' });
    }
  }

  getRoutes(location: RouteLink['location']): RouteLink[] {
    return this.routes.filter((y) => y.location === location);
  }
}
