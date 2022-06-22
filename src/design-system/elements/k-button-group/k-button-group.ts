import { CustomElement } from 'aurelia';

export class KButtonGroup {}

(CustomElement.getDefinition(KButtonGroup) as { capture: boolean }).capture = true;
