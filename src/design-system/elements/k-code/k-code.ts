import { customElement, ICustomElementViewModel } from 'aurelia';

import { captureFilter } from '../../common';

import template from './k-code.html';

@customElement({
  name: 'k-code',
  template,
  capture: captureFilter,
  shadowOptions: {
    mode: 'open',
  },
  processContent: (node, platform) => {
    const code = platform.document.createElement('code');
    code.innerHTML = `${(node as HTMLElement).innerHTML
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('=""', '')
      .trim()} <a onclick='navigator.clipboard.writeText(this.closest("code").textContent)'><k-icon name="content_copy" style="cursor:pointer;" color="var(--white)"></k-icon></a>`;
    let strip: string | null;
    if ((strip = (node as HTMLElement).getAttribute('strip'))) {
      code.innerHTML = code.innerHTML.replaceAll(strip, '');
    }

    node.appendChild(code);
  },
})
export class KCode implements ICustomElementViewModel {}
