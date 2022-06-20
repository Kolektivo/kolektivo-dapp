import { ICustomElementViewModel } from 'aurelia';
import { processContent } from '@aurelia/runtime-html';

@processContent((node, platform) => {
  const code = platform.document.createElement('pre');
  code.innerHTML = `<code>${(node as HTMLElement).innerHTML.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('=""', '').trim()} <a href='#' onclick='navigator.clipboard.writeText(this.closest("code").textContent)'><i class='fa fa-copy'></i></a></code>`;
  node.appendChild(code);
})
export class KCode implements ICustomElementViewModel {}
