# sonolus-express-demo-dynamic

A simple Sonolus custom server to demonstrate usage of [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express).

## Links

-   [Sonolus Website](https://sonolus.com)
-   [Sonolus Wiki](https://github.com/NonSpicyBurrito/sonolus-wiki)
-   [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express)
-   [sonolus-pack](https://github.com/NonSpicyBurrito/sonolus-pack)
-   [sonolus-express-demo-memory](https://github.com/NonSpicyBurrito/sonolus-express-demo-memory)

## About

This custom server contains features:

-   A fully functional Sonolus custom server that Sonolus app can connect to and play.
-   Contains [sonolus-bandori-engine](https://github.com/NonSpicyBurrito/sonolus-bandori-engine) and other items.
-   Allows users to upload levels (by opening server link in browser) and play them.

This custom server demonstrates the following concepts that are commonly used in making Sonolus custom servers:

-   Setting up [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express) to handler Sonolus custom server routes.
-   Loading static items packed by [sonolus-pack](https://github.com/NonSpicyBurrito/sonolus-pack).
-   Dynamically adding new items (third party package).
-   Dynamically fetching items (user uploads).

Additional notes:

-   This custom server is NOT production ready, it is meant as a demo.
-   All repository resources are not kept in memory.
-   All static item info are kept in memory (`sonolus.db`), which allows [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express) default handlers to do their jobs automatically.
-   All dynamic item info are not kept in memory, and are fetched on demand via custom handlers.
-   Keeping only static item info in memory, while dynamic item info are being fetched on demand, allows server to scale indefinitely regardless of the amount of items being served.
-   Implementing features provided by [sonolus-express](https://github.com/NonSpicyBurrito/sonolus-express) default handlers can be tedious. If scaling is not a concern, see [sonolus-express-demo-memory](https://github.com/NonSpicyBurrito/sonolus-express-demo-memory).

## Building

```
npm run build
```

## Running

After building, navigate to `dist` and:

```
node index.js
```
