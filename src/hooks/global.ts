import { I18N } from '@aurelia/i18n';
import { ICustomAttributeController, ICustomElementController, lifecycleHooks } from '@aurelia/runtime-html';
import { IState } from '../state';
import { Scope } from '@aurelia/runtime';
export type IHydratedComponentController = ICustomElementController | ICustomAttributeController | { scope: Scope | null };

@lifecycleHooks()
export class Global {
  constructor(@IState private readonly state: IState, @I18N private readonly i18n: I18N) {}

  created(_: unknown, controller: IHydratedComponentController) {
    if (!controller.scope) return;
    controller.scope.overrideContext.JSON = JSON;
    controller.scope.overrideContext.state = this.state;
    controller.scope.overrideContext.i18n = this.i18n;
  }
}
