import './prototypes';
import { App } from './app';
import { appContainer } from './app-container';
import Aurelia from 'aurelia';

const instance = new Aurelia(appContainer);
void instance.app(App).start();
