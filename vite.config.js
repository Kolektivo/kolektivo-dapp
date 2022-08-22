import { defineConfig } from 'vite';
const hmrCode = (className) => `
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

// vite.config.js
const htmlImport = {
    name: "htmlImport",
    /**
     * Checks to ensure that a html file is being imported.
     * If it is then it alters the code being passed as being a string being exported by default.
     * @param {string} code The file as a string.
     * @param {string} id The absolute path. 
     * @returns {{code: string}}
     */
    transform(code, id) {
      if (/^.*\.html$/g.test(id)) {
        code = `export default \`${code.replaceAll('${', '\\${')}\``;
      }
      else if (code.includes('customElement({')){
        const matches = /let (\w*) = class/.exec(code);
        code += `\n${hmrCode(matches[1])}`;
      }

      return { code }
    }
  }
  
  export default defineConfig({
    server: {
      port: 9000,
      strictPort: true
    },
    plugins: [ htmlImport ],
    define:{
      'process.env': process.env
    },
    envPrefix: 'KOL',
    resolve: {
      alias: {
        process: "process/browser",
        stream: "stream-browserify",
        zlib: "browserify-zlib",
        util: 'util',
        http: 'http-browserify',
        https: 'https-browserify',
        Buffer: 'buffer'
      }
    },
  });