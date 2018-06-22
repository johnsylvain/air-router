import Air from './index';

describe('Air', () => {
  beforeEach(() => {
    this.router = new Air();
  });

  describe('#constructor', () => {
    it('is an instance', () => {
      expect(this.router).toBeInstanceOf(Air);
    });

    it('sets the default route type', () => {
      expect(this.router.type).toBe('hash');
    });
  });

  describe('#cookies', () => {
    it('parses the browser cookies', () => {
      document.cookie = 'a=1';
      document.cookie = 'b=2';
      expect(this.router.cookies).toEqual({ a: '1', b: '2' });
    });
  });

  describe('#path', () => {
    it('parses the uri', () => {
      expect(this.router.path).toBeInstanceOf(Object);
      expect(this.router.path).toEqual({
        protocol: 'http:',
        hostname: 'example.com',
        port: '3000',
        pathname: '/pathname/',
        search: '?search=test',
        hash: '#hash',
        host: 'example.com:3000'
      });
    });
  });

  describe('#on', () => {
    beforeEach(() => {
      this.router.on('/', () => {});
    });

    it('pushes the parsed route', () => {
      expect(this.router.routes.length).toBe(1);
    });

    it('maps the route handler', () => {
      expect(this.router.handlers['/']).toBeInstanceOf(Function);
    });
  });
});
