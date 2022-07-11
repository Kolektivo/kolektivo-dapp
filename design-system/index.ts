import { IContainer, IRegistry, Registration } from 'aurelia';

import './fast';
import './styles/main.scss';
import './styles/shared.scss';
import * as attributes from './attributes';
import * as elements from './elements';
import * as valueConverters from './value-converters';
import { IDesignSystemConfiguration } from './configuration';
import { NotificationService } from './services';
import { ValidationHtmlConfiguration, ValidationTrigger } from '@aurelia/validation-html';
import Fast from './fast';

export class DesignSystemPlugin implements IRegistry {
  #configuration?: IDesignSystemConfiguration;

  public static configure(...args: [config: (config: IDesignSystemConfiguration) => void] | [config: IDesignSystemConfiguration]): DesignSystemPlugin {
    const instance = new DesignSystemPlugin();

    if (typeof args[0] === 'function') {
      instance.#configuration = {
        iconMap: new Map<string, string>(),
      };
      args[0](instance.#configuration);
    } else {
      instance.#configuration = args[0];
    }

    if (!instance.#configuration.formatDateTime) {
      instance.#configuration.formatDateTime = new Intl.DateTimeFormat('default', { dateStyle: 'full' }).format;
    }

    if (!instance.#configuration.formatDate) {
      instance.#configuration.formatDate = new Intl.DateTimeFormat('default', { month: '2-digit', day: '2-digit', year: 'numeric' }).format;
    }

    if (!instance.#configuration.formatNumber) {
      instance.#configuration.formatNumber = new Intl.NumberFormat('default', { maximumFractionDigits: 2 }).format;
    }

    if (!instance.#configuration.formatCurrency) {
      instance.#configuration.formatCurrency = new Intl.NumberFormat('default', { style: 'currency', currency: 'usd' }).format;
    }

    if (!instance.#configuration.formatPercent) {
      instance.#configuration.formatPercent = new Intl.NumberFormat('default', { style: 'percent' }).format;
    }

    return instance;
  }

  register(container: IContainer): IContainer {
    container.register(NotificationService);
    container.register(attributes);
    container.register(elements);
    container.register(valueConverters);
    container.register(Fast);
    container.register(Registration.instance(IDesignSystemConfiguration, this.#configuration));
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
