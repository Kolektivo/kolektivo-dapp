import { TransactionReceipt } from '@ethersproject/providers';

export enum EventMessageType {
  none = 0,
  Failure = 1,
  Exception = 1,
  Warning = 2,
  Info = 3,
  Debug = 4,
  Success = 5,
  Transaction = 6,
}

export class EventConfig {
  /**
   * for when action is Exception
   */
  public exception: any;
  constructor(
    public message: string,
    public type: EventMessageType = EventMessageType.Info,
    public title?: string,
    public data?: Record<string, unknown>,
  ) {}
}

export class EventConfigFailure extends EventConfig {
  constructor(message = 'An error occurred') {
    super(message, EventMessageType.Failure);
    this.message = `${this.message}`;
  }
}

export class EventConfigException extends EventConfig {
  constructor(message = 'An error occurred', public exception: unknown) {
    super(message, EventMessageType.Exception);
    // the stack trace, etc, will be logged by ConsoleLogService
    this.message = message;
  }
}

export class EventConfigAction extends EventConfig {
  constructor(
    message: string,
    /**
     * text for control
     */
    public actionText: string,
    /**
     * called when control is clicked
     */
    public action: () => void,
    type: EventMessageType = EventMessageType.Info,
  ) {
    super(message, type);
  }
}

export class EventConfigAddress extends EventConfig {
  constructor(
    message: string,
    public address: string,
    /**
     * text to display instead of address
     */
    public actionText: string,
  ) {
    super(message);
  }
}

export class EventConfigTransaction extends EventConfig {
  constructor(message: string, public receipt: TransactionReceipt) {
    super(message, EventMessageType.Transaction);
  }
}
