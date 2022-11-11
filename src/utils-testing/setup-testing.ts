import { BrowserPlatform } from '@aurelia/platform-browser';
import { setPlatform } from '@aurelia/testing';

import '../prototypes';

import { Window } from 'happy-dom';

const w = new Window();
export const preparePlatform = () => {
  const platform = BrowserPlatform.getOrCreate(w as unknown as typeof globalThis);
  setPlatform(platform);
  return platform;
};

preparePlatform();
