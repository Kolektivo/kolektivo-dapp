export const numberToPixels = (value?: string | number): string | undefined => {
  if (value == null) return undefined;
  if (typeof value === 'string' && value?.trim().includes(' ')) {
    value
      .trim()
      .split(' ')
      .map(x => numberToPixels(x))
      .join(' ');
  }

  if (isNaN(Number(value))) return String(value);
  return value + 'px';
};

export function gridTemplateRowSetter(value?: string | number): string | number {
  if (!value) return value;
  if (!isNaN(Number(value))) return `repeat(${value}, 1fr)`;
  return value;
}

export function IfExistsThenTrue(value: unknown): unknown {
  return value !== 'false' && (value === '' || value);
}

export function uid(): string {
  return Math.random().toString(36).substring(2);
}

export type DisplayValue<T = number> = { display: string; value: T };

export function autoSlot(node, platform): void {
  const template = platform.document.createElement('template');
  while (node.firstChild) {
    template.content.appendChild(node.firstChild);
  }
  template.setAttribute('au-slot', '');
  node.appendChild(template);
}
export function noop(e: Event): boolean {
  e.stopImmediatePropagation();
  e.preventDefault();
  return false;
}
