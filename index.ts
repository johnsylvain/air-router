import { match, parse, exec } from 'matchit';

export default class Microrouter {
  private routes: string[] = [];
  private handlers: object = {};

  constructor(public type: string = 'hash') {}

  get path(): string {
    return {
      hash: document.location.hash.substring(1) || '/',
      history: document.location.pathname
    }[this.type];
  }

  private bindEvents(eventType: string): void {
    const eventMap: { [key: string]: string } = {
      hash: 'hashchange',
      history: 'popstate'
    };

    ['load', eventMap[this.type]].forEach((event: string) => {
      window[eventType](event, () => {
        const arr = match(this.path, this.routes);
        const handler = this.handlers[(arr[0] || {}).old || this.path];
        const parser = document.createElement('a');
        parser.href = document.location.href;

        const request: { [key: string]: any } = [
          'protocol',
          'hostname',
          'port',
          'pathname',
          'search',
          'hash',
          'host',
        ].reduce(
          (acc: object, cur: string) => ({ ...acc, [cur]: parser[cur]}),
          {
            params: exec(this.path, arr)
          }
        );

        handler(request);
      });
    });
  }

  on(pattern: string, handler: () => void): object {
    this.routes.push(parse(pattern));
    this.handlers[pattern] = handler;
    return this;
  }

  listen(): object {
    this.bindEvents('addEventListener');
    return this;
  }

  unlisten(): object {
    this.bindEvents('removeEventListener');
    return this;
  }

  go(path: string): void {
    path = this.type === 'hash' ? (/^#/.test(path) ? path : `#${path}`) : path;
    window.history.pushState(undefined, undefined, path);

    if (this.type === 'history') {
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  }
}
