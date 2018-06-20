# Routerware

> Route change handler

## 👌 Features

- **Flexible.** Use as a standalone router.
- **Small.** Built with bundle size in mind.
- **Familiar.** Use express-like route syntax.

## 💻 Usage

```js
import Routerware from "routerware";

const router = new Routerware();

router
  .on("/home", () => {
    console.log("home route");
  })
  .on("/:name", request => {
    console.log(request.params.name);
  });

router.listen();
```

## ⚙️ API Methods

### `on(pattern, handler)`

> Register route with a `pattern` and a `handler`

### `listen()`

> Start the router by listening to changes in the url.

### `unlisten()`

> Stop the router by unlistening to changes in the url.

### `go(path)`

> Navigate to the specified `path` via the `pushState` History API. If using a hash router, the `#` is optional.

## 🛠 Options

### Hash Routing (default)

```js
const router = new Routerware("hash");
```

### Browser History Routing

```js
const router = new Routerware("history");
```
