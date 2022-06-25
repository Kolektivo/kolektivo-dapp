import { ICustomElementViewModel } from 'aurelia';
import { processContent } from '@aurelia/runtime-html';

@processContent((node, platform) => {
  const code = platform.document.createElement('code');
  code.innerHTML = `${(node as HTMLElement).innerHTML.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('=""', '').trim()} <a href='#' onclick='navigator.clipboard.writeText(this.closest("code").textContent)'><i class='fa fa-copy'></i></a>`;
  node.appendChild(code);
})
export class KCode implements ICustomElementViewModel {}
