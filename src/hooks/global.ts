import { I18N } from '@aurelia/i18n';
import { ICustomAttributeController, ICustomElementController, lifecycleHooks } from '@aurelia/runtime-html';
import { IState } from '../state';
export type IHydratedComponentController = ICustomElementController | ICustomAttributeController;

@lifecycleHooks()
export class Global {
  constructor(@IState private readonly state: IState, @I18N private readonly i18n: I18N) {}

  created(_: unknown, controller: IHydratedComponentController) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!controller.scope) return;
    controller.scope.overrideContext.JSON = JSON;
    controller.scope.overrideContext.state = this.state;
    controller.scope.overrideContext.i18n = this.i18n;
  }
}
