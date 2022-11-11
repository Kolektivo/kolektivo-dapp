import { valueConverter } from 'aurelia';

import { smallHexString } from '../../utils';

@valueConverter('smallHexString')
export class SmallHexStringValueConverter {
  public toView(value: string): string {
    return smallHexString(value);
  }
}
