# Scaffold UI

## Testing packages with local example

1. Start the dev mode of the monorepo

```bash
pnpm dev
```

This will start the dev mode of both the hooks and components packages, along with the example app.

2. Visit the example app at [http://localhost:3000](http://localhost:3000)

3. Make changes to the packages and see them reflected in the example app

## Testing packages with Scaffold-ETH 2 locally

### Quick Setup

1. Start the dev mode for both packages in the scaffold-ui directory:

```bash
# For hooks
cd packages/hooks && pnpm run dev &

# For components
cd packages/components && pnpm run dev &
```

2. Add both packages in Scaffold-ETH 2 inside the `packages/nextjs/package.json` file:

```json
"@scaffold-ui/hooks": "file:../../../scaffold-ui/packages/hooks",
"@scaffold-ui/components": "file:../../../scaffold-ui/packages/components"
```

**Note:** The relative paths use `../../../` because they are resolved from the `packages/nextjs` directory in Scaffold-ETH 2's workspace structure.

3. Update the `webpack` section in the `next.config.js` or `next.config.ts` file:

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

4. Add the css file in `packages/nextjs/app/layout.tsx` file for the components package:

```tsx
import "@scaffold-ui/components/styles.css";
```

5. Install dependencies in Scaffold-ETH 2:

```bash
yarn install
```

5. Run Scaffold-ETH 2 app:

```bash
yarn chain    # In one terminal
yarn start    # In another terminal
```

6. Any changes in this repo will require running `yarn install` in Scaffold-ETH 2 again.
