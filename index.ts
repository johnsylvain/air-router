import { match, parse, exec } from 'matchit';

export default class Routerware {
  private routes: string[] = [];
  private handlers: object = {};

  constructor(public type: string = 'hash') {}

  get path(): { [key: string]: string } {
    const parser = document.createElement('a');
    parser.href = document.location.href;

    return [
      'protocol',
      'hostname',
      'port',
      'pathname',
      'search',
      'hash',
      'host',
    ].reduce(
      (acc: object, cur: string) => ({ ...acc, [cur]: parser[cur]}),
      {}
    );
  }

  private bindEvents(eventType: string): void {
    const eventMap: { [key: string]: string } = {
      hash: 'hashchange',
      history: 'popstate'
    };

    ['load', eventMap[this.type]].forEach((event: string) => {
      window[eventType](event, () => {
        const path = {
          hash: this.path.hash.substring(1) || '/',
          history: this.path.pathname
        }[this.type];
        const arr = match(path, this.routes);
        const handler = this.handlers[(arr[0] || {}).old || path];
        const params = exec(path, arr);

        handler({ params, ...this.path });
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
