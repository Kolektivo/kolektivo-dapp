import { customElement, ICustomElementViewModel } from '@aurelia/runtime-html';
import template from './valut-by-asset-type-card.html';
'import './valut-by-asset-type-card.scss';

@customElement({ name: 'valut-by-asset-type-card', template })
export class ValutByAssetTypeCard implements ICustomElementViewModel {
  constructor() {
    // you can inject the element or any DI in the constructor
   }
}
