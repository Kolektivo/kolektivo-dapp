import { IDisposable, transient } from 'aurelia';

@transient()
export class DisposableCollection implements IDisposable {
  private disposables: IDisposable[];

  constructor() {
    this.disposables = new Array<IDisposable>();
  }

  public push(disposable: IDisposable): number {
    return this.disposables.push(disposable);
  }

  public dispose(disposable?: IDisposable): void {
    if (disposable) {
      this._dispose(disposable);
    } else {
      for (disposable of this.disposables) {
        disposable.dispose();
      }
      this.disposables.length = 0;
    }
  }

  private _dispose(disposable: IDisposable): void {
    disposable.dispose();
    this.disposables.splice(this.disposables.indexOf(disposable), 1);
  }
}
