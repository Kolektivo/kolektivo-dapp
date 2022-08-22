import { BigNumber } from 'ethers';
import { ICustomElementViewModel, bindable, customElement } from 'aurelia';
import { INumberService } from 'services';
import { fromWei } from './../../../services/ethereum-service';
import { ifExistsThenTrue } from '../../../../design-system/common';
import template from './formatted-number.html';

@customElement({ name: 'formatted-number', template })
export class FormattedNumber implements ICustomElementViewModel {
  @bindable value?: number | string | BigNumber;
  @bindable ethwei?: number;
  @bindable defaultText = '--';
  @bindable decimals = 2;
  @bindable({ set: ifExistsThenTrue }) commas = false;
  @bindable({ set: ifExistsThenTrue }) showTooltip = false;
  @bindable({ set: ifExistsThenTrue }) currency = false;
  @bindable({ set: ifExistsThenTrue }) percentage = false;
  text = '';
  constructor(@INumberService private readonly numberService: INumberService) {}
  valueChanged() {
    let text = null;
    if (this.value) {
      if (this.ethwei && BigNumber.isBigNumber(this.value)) {
        this.value = fromWei(BigNumber.from(this.value), this.ethwei);
      }
      text = this.numberService.toString(Number(this.value), {
        fractionDigits: this.decimals,
        useGrouping: this.commas,
        isCurrency: this.currency,
        isPercentage: this.percentage,
      });
    }
    this.text = text ?? this.defaultText;
  }
  get tooltipText(): string | undefined {
    return this.value?.toString(10);
  }
}
