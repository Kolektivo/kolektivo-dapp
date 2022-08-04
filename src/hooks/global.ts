import { ICustomAttributeController, ICustomElementController, lifecycleHooks } from '@aurelia/runtime-html';
import { IState } from '../state';
export type IHydratedComponentController = ICustomElementController | ICustomAttributeController;

@lifecycleHooks()
export class Global {
  constructor(@IState private readonly state: IState) {}

  binding(_: unknown, controller: IHydratedComponentController) {
    controller.scope.overrideContext.JSON = JSON;
    controller.scope.overrideContext.state = this.state;
  }
}
