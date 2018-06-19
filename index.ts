export default class Microrouter {
  public type: string = 'hash';
  private routes: object = {};

  constructor(type?: string) {
    this.type = type;
  }

  get path(): string {
    return {
      hash: document.location.hash.substring(1) || '/',
      history: document.location.pathname
    }[this.type];
  }

  private bindEvents(
    eventType: 'addEventListener' | 'removeEventListener' | 'load'
  ): void {
    const eventMap: { [key: string]: string } = {
      hash: 'hashchange',
      history: 'popstate'
    };

    ['load', eventMap[this.type]].forEach((event: string) => {
      window[eventType](event, () => {
        this.routes[this.path]();
      });
    });
  }

  on(pattern: string, handler: () => void): object {
    this.routes[pattern] = handler;
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
