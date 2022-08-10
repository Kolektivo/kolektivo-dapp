import './assets.scss';
import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from 'aurelia';
import { IGridColumn } from '../../../../../../../../../design-system/elements/k-data-grid/grid-column';
import template from './assets.html';

@customElement({ name: 'assets', template })
export class Assets implements ICustomElementViewModel {
  testColumns: IGridColumn[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.testColumns = [
      {
        headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.token'),
        field: 'token',
        width: '1fr',
        template: '<token name.bind="token" icon.bind="tokenIcon"></token>',
      },
      { headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.price'), field: 'price', width: '1fr' },
      { headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.quantity'), field: 'quantity', width: '1fr' },
      { headerText: this.i18n.tr('navigation.reserve.overview.assets.assets-tab.grid-headers.total'), field: 'totalValue', width: '1fr' },
    ];
  }

  testData = [
    {
      token: 'ETH',
      tokenIcon: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'USDT',
      tokenIcon: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'BNB',
      tokenIcon: 'https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'USDC',
      tokenIcon: 'https://assets.coingecko.com/coins/images/6319/thumb/USD_Coin_icon.png?1547042389',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'XRP',
      tokenIcon: 'https://assets.coingecko.com/coins/images/44/thumb/xrp-symbol-white-128.png?1605778731',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'ADA',
      tokenIcon: 'https://assets.coingecko.com/coins/images/975/thumb/cardano.png?1547034860',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'SOL',
      tokenIcon: 'https://assets.coingecko.com/coins/images/4128/thumb/solana.png?1640133422',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
    {
      token: 'DOT',
      tokenIcon: 'https://assets.coingecko.com/coins/images/12171/thumb/polkadot.png?1639712644',
      price: '$$$',
      quantity: 400,
      totalValue: '$$$',
    },
  ];
}
