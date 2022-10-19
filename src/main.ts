import './prototypes';
import { App } from './app';
import { appContainer } from './app-container';
import Aurelia from 'aurelia';

export const instance = new Aurelia(appContainer);
void instance.app(App).start();
