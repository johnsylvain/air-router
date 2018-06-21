# Air Router

> Lightweight route handler

## 👌 Features

- **Flexible.** Use as a standalone router.
- **Small.** Built with bundle size in mind.
- **Familiar.** Use express-like route syntax.

## 💻 Usage

```js
import Air from "air-router";

// Use a hash router (default)
const router = new Air("hash");

// Use a history router (via History API)
const router = new Air("history");

router
  .on("/home", () => {
    console.log("home route");
  })
  .on("/:name", request => {
    console.log(request.params.name);
  });

router.listen();
```

## Methods

### `on(pattern, handler)`

> Register route with a `pattern` and a `handler`

### `listen()`

> Start the router by listening to changes in the url.

### `unlisten()`

> Stop the router by unlistening to changes in the url.

### `go(path)`

> Navigate to the specified `path` via the `pushState` History API. If using a hash router, the `#` is optional.

## Request object

### `request.cookies`

> Retrieve an object of cookies in key-value pairs.

```js
// Cookie: name=john
request.cookie;
// => { name: 'john' }
```

### `request.params`

> This property is an object containing properties mapped to the named route "parameters"

```js
// /user/john
req.params.name;
// => 'john'
```

### URI parsed properties

> Air Router automatically parses the URI into 7 properties

| Request property | Example: `http://example.com:3000/pathname/?search=test#hash"` |
| ---------------- | -------------------------------------------------------------- |
| `protocol`       | `http:`                                                        |
| `hostname`       | `example.com`                                                  |
| `port`           | `3000`                                                         |
| `pathname`       | `/pathname/`                                                   |
| `search`         | `?search=test`                                                 |
| `hash`           | `#hash`                                                        |
| `host`           | `example.com:3000`                                             |
