import { ICustomElementViewModel } from 'aurelia';
import { processContent } from '@aurelia/runtime-html';

@processContent((node, platform) => {
  const code = platform.document.createElement('code');
  code.innerHTML = `${(node as HTMLElement).innerHTML.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('=""', '').trim()} <a href='#' onclick='navigator.clipboard.writeText(this.closest("code").textContent)'><k-icon name="content_copy"></k-icon></a>`;
  let strip: string;
  if ((strip = (node as HTMLElement).getAttribute('strip'))) {
    code.innerHTML = code.innerHTML.replaceAll(strip, '');
  }

  node.appendChild(code);
})
export class KCode implements ICustomElementViewModel {}
