import { customElement, ICustomElementViewModel } from 'aurelia';
import { I18N } from '@aurelia/i18n';

import { IGridColumn } from '../../../../../../design-system/elements/k-data-grid/grid-column';
import { IReserveStore } from '../../../../../../stores/reserve-store';

import { IConfiguration } from './../../../../../../configurations/configuration';
import template from './pool-card.html';

import './pool-card.scss';

@customElement({ name: 'pool-card', template })
export class PoolCard implements ICustomElementViewModel {
  columns: IGridColumn[] = [];

  constructor(@I18N private readonly i18n: I18N, @IReserveStore private readonly reserveStore: IReserveStore, @IConfiguration private readonly configuration: IConfiguration) {
    this.columns = [
      {
        headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.tokens'),
        field: 'tokens',
        width: '1fr',
        template: `<k-stack direction="row" gap="10">
                      <k-avatar-group>
                          <k-avatar repeat.for="token of tokens" src.bind="token.icon" size="31" tooltip.bind="token.symbol"></k-avatar>
                      </k-avatar-group>
                      <k-text>
                        \${tokens[0].symbol}-\${tokens[1].symbol}
                      </k-text>
                    </k-stack>`,
      },
      {
        headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.volume'),
        field: 'volume',
        width: '1fr',
        template: '${volume | currency}',
      },
      { headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.tvl'), field: 'tvl', width: '1fr', template: '${tvl | currency}' },
      { headerText: this.i18n.tr('navigation.reserve.k-cur.pool.grid-headers.fees'), field: 'fees', width: '1fr', template: '${fees | currency}' },
    ];
  }
  get data() {
    return this.reserveStore.primaryPoolData;
  }
}
