import { valueConverter } from 'aurelia';

import { smallHexString } from '../../utils';

@valueConverter('smallHexString')
export class SmallHexString {
  public toView(value: string): string {
    return smallHexString(value);
  }
}
