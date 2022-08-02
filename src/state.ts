import { DI, IContainer, Registration } from 'aurelia';

export type IState = State;
export const IState = DI.createInterface<IState>('State');

export class State {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IState, State));
  }
  sideBarOpen = false;
  treasuryState = {};
}
