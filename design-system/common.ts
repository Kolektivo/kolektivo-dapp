export const numberToPixels = (value?: string | number) => {
  console.log(value);
  if (!value || isNaN(Number(value))) return value;
  return value + 'px';
};

export const gridTemplateRowSetter = (value?: string | number) => {
  if (!value) return value;
  if (!isNaN(Number(value))) return `repeat(${value}, 1fr)`;
  return value;
};

export const IfExistsThenTrue = (value: unknown) => value !== 'false' && (value === '' || value);
