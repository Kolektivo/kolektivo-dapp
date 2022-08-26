import { I18N } from '@aurelia/i18n';
import { ICustomElementViewModel, customElement } from '@aurelia/runtime-html';
import { IGridColumn } from '../../../../../../design-system/elements/k-data-grid/grid-column';
import template from './asset-card.html';

@customElement({ name: 'asset-card', template })
export class AssetCard implements ICustomElementViewModel {
  columns: IGridColumn[] = [];
  constructor(@I18N private readonly i18n: I18N) {
    this.columns = [
      {
        headerText: this.i18n.tr('navigation.reserve.risk.assets.grid-headers.token'),
        field: 'token',
        width: '1fr',
        template: '<avatar-text name.bind="token" src.bind="tokenIcon"></avatar-text>',
      },
      { headerText: this.i18n.tr('navigation.reserve.risk.assets.grid-headers.risk-class'), field: 'riskClass', width: '1fr' },
      {
        headerText: this.i18n.tr('navigation.reserve.risk.assets.grid-headers.collateral-value'),
        field: 'collateralValue',
        width: '1fr',
        template: '${collateralValue | currency}',
      },
      {
        headerText: this.i18n.tr('navigation.reserve.risk.assets.grid-headers.percent-of-reserve'),
        field: 'percentOfReserve',
        width: '1fr',
        template: '${percentOfReserve | percentage}',
      },
    ];
  }

  data = [
    {
      token: 'ETH',
      tokenIcon: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
      riskClass: 'High Risk',
      collateralValue: 400,
      percentOfReserve: 0.4,
    },
    {
      token: 'USDT',
      tokenIcon: 'https://assets.coingecko.com/coins/images/325/thumb/Tether-logo.png?1598003707',
      riskClass: 'Moderate Risk',
      collateralValue: 400,
      percentOfReserve: 0.4,
    },
    {
      token: 'BNB',
      tokenIcon: 'https://assets.coingecko.com/coins/images/825/thumb/bnb-icon2_2x.png?1644979850',
      riskClass: 'Low Risk',
      collateralValue: 400,
      percentOfReserve: 0.2,
    },
  ];
}
