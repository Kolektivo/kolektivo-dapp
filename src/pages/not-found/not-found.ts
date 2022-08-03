import { customElement } from 'aurelia';
import template from './not-found.html';
@customElement({ name: 'not-found', template })
export class NotFound {
  public static parameters = ['id'];
  public missingComponent?: string;

  public load(parameters: { id: string }): void {
    this.missingComponent = parameters.id;
  }
}
