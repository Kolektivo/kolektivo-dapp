import { DI, IContainer, ILogger, Registration } from 'aurelia';

export type IHttpService = HttpService;
export const IHttpService = DI.createInterface<IHttpService>('HttpService');
const headers = { accept: 'application/json' };
const postHeaders = { 'content-type': 'application/json', ...headers };

export class HttpService {
  public static register(container: IContainer): void {
    container.register(Registration.singleton(IHttpService, HttpService));
  }

  constructor(@ILogger private readonly logger: ILogger) {
    this.logger = logger.scopeTo('HttpService');
  }

  public async call<T = unknown>(url: string, body?: BodyInit, overrides?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      body: body,
      method: body ? 'POST' : 'GET',
      headers: body ? postHeaders : headers,
      ...overrides,
    });

    if (response.ok) return (await response.json()) as T;

    const error = new Error(await response.text());
    this.logger.error({ response: response, error: error });

    return Promise.reject(error);
  }
}
