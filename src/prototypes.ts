Array.prototype.sum = function (): number {
  return this.reduce((a: number, b: number) => a + b, 0);
};
