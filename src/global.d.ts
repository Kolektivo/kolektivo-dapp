declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Array<T = number> {
    sum: () => T;
  }
}
export {};
