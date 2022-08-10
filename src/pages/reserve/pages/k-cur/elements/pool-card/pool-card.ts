import './pool-card.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from './../../../../../../../design-system/elements/k-data-grid/grid-column';
import template from './pool-card.html';

@customElement({ name: 'pool-card', template })
export class PoolCard implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.columns = [
      {
        headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.tokens'),
        field: 'tokens',
        width: '1fr',
        template: '<k-avatar-group><k-avatar repeat.for="token of tokenIcons" src.bind="token" size="31"></k-avatar></k-avatar-group>',
      },
      {
        headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.volume'),
        field: 'volume',
        width: '1fr',
        template: '${volume | currency}',
      },
      { headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.tvl'), field: 'tvl', width: '1fr', template: '${tvl | currency}' },
      { headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.fees'), field: 'fees', width: '1fr', template: '${fees | currency}' },
      {
        headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.range'),
        field: 'range',
        width: '1fr',
        template: '${range | percentage}',
      },
    ];
  }

  data = [
    {
      token: ['kCUR', 'cUSD'],
      tokenIcons: [
        'https://assets.website-files.com/5fcaa3a6fcb269f7778d1f87/60a957ee7011916564689917_LOGO_MARK_color.svg',
        'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
      ],
      volume: 55000,
      tvl: 87000,
      fees: 66,
      range: -0.2,
    },
  ];
}
