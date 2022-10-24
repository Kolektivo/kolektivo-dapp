import '../prototypes';
import { BrowserPlatform } from '@aurelia/platform-browser';
import { Window } from 'happy-dom';
import { setPlatform } from '@aurelia/testing';

const w = new Window();
export const preparePlatform = () => {
  const platform = BrowserPlatform.getOrCreate(w as unknown as typeof globalThis);
  setPlatform(platform);
  return platform;
};

preparePlatform();
