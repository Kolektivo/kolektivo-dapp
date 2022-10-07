import './prototypes';
import { App } from './app';
import { appContainer } from './app-container';
import Aurelia from 'aurelia';

const params = new URLSearchParams(location.search);
const stamp = params.get('seed-data');
if (stamp) {
  await import('./firebase').then((x) => x.seed(new Date(stamp)));
} else {
  const instance = new Aurelia(appContainer);
  void instance.app(App).start();
}
