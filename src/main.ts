import Aurelia from 'aurelia';

import './prototypes';

import { App } from './app';
import { appContainer } from './app-container';

export const instance = new Aurelia(appContainer);
void instance.app(App).start();
