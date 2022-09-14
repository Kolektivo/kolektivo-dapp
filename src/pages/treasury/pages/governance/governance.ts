import * as elements from './elements';
import { I18N } from '@aurelia/i18n';
import { customElement } from 'aurelia';
import template from './governance.html';
@customElement({ name: 'governance', template, dependencies: [elements] })
export class Governance {
  constructor(@I18N private readonly i18n: I18N) {}
}
