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
        handler({ params: exec(this.path, arr) });
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
}
