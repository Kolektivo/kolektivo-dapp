import { IContainer, IRegistry } from 'aurelia';

import './styles/main.scss';
import './styles/shared.scss';
import * as attributes from './attributes';
import * as elements from './elements';
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';
interface DesignSystemConfiguration {
  components?: [];
  includeAllComponents?: boolean;
}

class DesignSystemPlugin implements IRegistry {
  #configuration?: DesignSystemConfiguration;

  public static configure(...args: [config: (config: DesignSystemPlugin) => void] | [config: DesignSystemConfiguration]): DesignSystemPlugin {
    const instance = new DesignSystemPlugin();

    if (typeof args[0] === 'function') {
      args[0](instance);
    } else {
      instance.#configuration = args[0];
    }
    return instance;
  }

  register(container: IContainer): IContainer {
    container.register(attributes);
    container.register(elements);
    container.register(
      ValidationHtmlConfiguration.customize(options => {
        options.DefaultTrigger = ValidationTrigger.changeOrFocusout;
      }),
    );

    // container = container.register(AppTask.beforeCreate(IContainer, async c => {
    //     // console
    //     console.log(this.#configuration)
    //     c.register(elements);
    //     c.register(attributes);
    // }));

    return container;
  }
}

const plugin = DesignSystemPlugin.configure;

export { plugin as DesignSystemPlugin, DesignSystemConfiguration };
export default plugin;
