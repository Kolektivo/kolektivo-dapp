export const numberToPixels = (value?: string | number) => {
  if (!value || isNaN(Number(value))) return value;
  return value + 'px';
};

export const gridTemplateRowSetter = (value?: string | number) => {
  if (!value) return value;
  if (!isNaN(Number(value))) return `repeat(${value}, 1fr)`;
  return value;
};

export const IfExistsThenTrue = (value: unknown) => value !== 'false' && (value === '' || value);

export function uid(): string {
  return Math.random().toString(36).substring(2);
}

export type DisplayValue<T = number> = { display: string; value: T };

export const autoSlot = (node, platform) => {
  const template = platform.document.createElement('template');
  while (node.firstChild) {
    template.content.appendChild(node.firstChild);
  }
  template.setAttribute('au-slot', '');
  node.appendChild(template);
};
