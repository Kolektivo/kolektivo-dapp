var rollupPluginutils = require('rollup-pluginutils');

function hmrCode(className) {
    return `
import {CustomElement, LifecycleFlags, IHydrationContext, Controller} from '@aurelia/runtime-html';
import {Metadata} from '@aurelia/metadata';
    // @ts-ignore
    const controllers = [];

    // @ts-ignore
    if (import.meta.hot) {

    // @ts-ignore
    import.meta.hot.accept();

    // @ts-ignore
    const hot = import.meta.hot;

    let aurelia = hot.data?.aurelia;

    // @ts-ignore
    document.addEventListener('au-started', (event) => {aurelia= event.detail; });
    const currentClassType = ${className};

    // @ts-ignore
    const proto = ${className}.prototype

    // @ts-ignore
    const ogCreated = proto ? proto.created : undefined;

    if (proto) {
      // @ts-ignore
      proto.created = function(controller) {
        // @ts-ignore
        ogCreated && ogCreated.call(this, controller);
        controllers.push(controller);
      }
    }

    hot.dispose(function (data) {
      // @ts-ignore
      data.controllers = controllers;
      data.aurelia = aurelia;
    });

    if (hot.data?.aurelia) {
      const newDefinition = CustomElement.getDefinition(currentClassType);
      Metadata.define(newDefinition.name, newDefinition, currentClassType);
      Metadata.define(newDefinition.name, newDefinition, newDefinition);
      hot.data.aurelia.container.res[CustomElement.keyFrom(newDefinition.name)] = newDefinition;

      const previousControllers = hot.data.controllers;
      if(previousControllers == null || previousControllers.length === 0) {
        // @ts-ignore
        hot.invalidate();
      }

      // @ts-ignore
      previousControllers.forEach(controller => {
        const values = { ...controller.viewModel };
        const hydrationContext = controller.container.get(IHydrationContext)
        const hydrationInst = hydrationContext.instruction;

        // @ts-ignore
        Object.keys(values).forEach(key => {
          // @ts-ignore
          if (!controller.bindings?.some(y => y.sourceExpression?.name === key && y.targetProperty)) {
            delete values[key];
          }
        });
        const h = controller.host;
        delete controller._compiledDef;
        controller.viewModel = controller.container.invoke(currentClassType);
        controller.definition = newDefinition;
        Object.assign(controller.viewModel, values);
        controller.hooks = new controller.hooks.constructor(controller.viewModel);
        controller.hE(hydrationInst, hydrationContext);
        h.parentNode.replaceChild(controller.host, h);
        controller.hostController = null;
        controller.deactivate(controller, controller.parent ?? null, LifecycleFlags.none);
        controller.activate(controller, controller.parent ?? null, LifecycleFlags.none);
      });
    }
  }`;
}

export const hmrPlugin = () =>{
  return {
    name: "hmrPlugin",
    /**
     * Checks to ensure that a html file is being imported.
     * If it is then it alters the code being passed as being a string being exported by default.
     * @param {string} code The file as a string.
     * @param {string} id The absolute path. 
     * @returns {{code: string}}
     */
    transform(code, id) {
       if (code.includes('customElement({')){
        const matches = /let (\w*) = class/.exec(code);
        code += `\n${hmrCode(matches?.[1])}`;
      }

      return { code }
    }
  }
};

  export const rawHtml = () =>{
    const opts = {};
    opts.include = '**/*.ts';
    var filter = rollupPluginutils.createFilter(opts.include, opts.exclude);
    return {
      name: 'raw',
      transform: function transform(code, id) {
        if (filter(id)) {
          code = code.replaceAll(/(import .* from .*)\.html/g, '$1.html?raw');
          return {code};
        }
      }
    };
  }