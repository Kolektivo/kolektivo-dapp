import { I18N } from '@aurelia/i18n';
import { Scope } from '@aurelia/runtime';
import { ICustomAttributeController, ICustomElementController, lifecycleHooks } from '@aurelia/runtime-html';

import { IStore } from '../stores/store';

export type IHydratedComponentController = ICustomElementController | ICustomAttributeController | { scope: Scope | null };

@lifecycleHooks()
export class Global {
  constructor(@IStore private readonly store: IStore, @I18N private readonly i18n: I18N) {}

  created(_: unknown, controller: IHydratedComponentController) {
    if (!controller.scope) return;
    controller.scope.overrideContext.JSON = JSON;
    controller.scope.overrideContext.store = this.store;
    controller.scope.overrideContext.i18n = this.i18n;
  }
}
