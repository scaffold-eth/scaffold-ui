# Scaffold UI

## Testing `hooks` package with Scaffold-ETH 2 locally

1. Start the dev mode in the `packages/hooks` directory

```bash
cd packages/hooks && pnpm run dev
```

2. Add the package in scaffold-eth 2 inside the `packages/nextjs/package.json` file:

```bash
"@scaffold-ui/hooks": "file:../scaffold-ui/packages/hooks",
```

3. While using nextjs app, update the `webpack` section in the `next.config.js` file:

```js
  webpack: (config, { dev }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    if (dev) {
      config.watchOptions = {
        followSymlinks: true,
      };

      config.snapshot.managedPaths = [];
    }
    return config;
  },
```

4. Do the yarn install in the project in scaffold-eth 2

```bash
yarn install
```

5. Run scaffold-eth 2 app with `yarn chain` and `yarn start`

6. Any changes in this repo will require running `yarn install` in scaffold-eth 2 again
