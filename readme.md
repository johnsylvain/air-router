# Microrouter

> Small browser router

## Basic Usage

```js
import Microrouter from 'microrouter';

const router = new Microrouter();

router
  .on('*', () => {
    console.log('match all routes');
  })
  .on('/home', () => {
    console.log('home');
  });

router.listen();
```

## API Methods

### `on(pattern, handler)`

> Register route with a `pattern` and a `handler`

### `listen()`

> Start the router by listening to changes in the url.

### `unlisten()`

> Stop the router by unlistening to changes in the url.

## Options

### Hash Routing (default)

```js
const router = new Microrouter('hash');
```

### Browser History Routing

```js
const router = new Microrouter('history');
```
