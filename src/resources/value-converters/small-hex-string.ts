import { smallHexString } from 'utils';
import { valueConverter } from 'aurelia';

@valueConverter('small-hex-string')
export class SmallHexStringValueConverter {
  public toView(value: string): string {
    return smallHexString(value);
  }
}
