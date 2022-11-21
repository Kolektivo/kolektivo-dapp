import { customElement, ICustomElementViewModel } from 'aurelia';

import template from './not-found.html';

import './not-found.scss';

@customElement({ name: 'not-found', template })
export class NotFound implements ICustomElementViewModel {
  public static parameters = ['id'];
  public missingComponent?: string;
  promise?: Promise<unknown>;

  binding() {
    this.promise = import('@lottiefiles/lottie-player');
  }

  async attaching() {
    await this.promise;
  }

  public load(parameters: { id: string }): void {
    this.missingComponent = parameters.id;
  }
}
