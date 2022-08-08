import { DI, IContainer, ILogger, Registration } from 'aurelia';

export type IAxiosService = AxiosService;
export const IAxiosService = DI.createInterface<IAxiosService>('AxiosService');

export class AxiosService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IAxiosService, AxiosService));
  }

  constructor(@ILogger private readonly logger: ILogger) {
    this.logger = logger.scopeTo('AxiosService');
  }

  public axiosErrorHandler(err: { response?: { status: string; data: string; headers: [] }; request?: string; message: string }): string {
    let errorMsg: string;

    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      errorMsg = `HTTP status ${err.response.status}`;
      this.logger.error(err.response.data);
      this.logger.error(err.response.status);
      this.logger.error(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorMsg = `No response: ${err.message}`;
      this.logger.error(err.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      errorMsg = `Unknown error: ${err.message}`;
      this.logger.error(err.message);
    }
    return errorMsg;
  }
}
