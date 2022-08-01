import { smallHexString } from 'utils';
import { valueConverter } from 'aurelia';

@valueConverter('smallHexString')
export class SmallHexStringValueConverter {
  public toView(value: string): string {
    return smallHexString(value);
  }
}
