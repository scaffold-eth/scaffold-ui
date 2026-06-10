# Contributing to Scaffold UI

Thanks for your interest in contributing! Bug reports, feature requests, and PRs are all welcome.

## Repo layout

This repo is a pnpm workspace with three published packages, a docs site, and a local example app.

- `packages/components` — `@scaffold-ui/components`
- `packages/hooks` — `@scaffold-ui/hooks`
- `packages/debug-contracts` — `@scaffold-ui/debug-contracts`
- `docs/` — documentation site (Vocs, deployed at [ui.scaffoldeth.io](https://ui.scaffoldeth.io))
- `example/` — Next.js + wagmi app used to test the packages locally

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/installation) 10+

## Setup

```bash
pnpm install
```

## Local development with the example app

The fastest feedback loop. `pnpm dev` runs all three packages in watch mode and starts the example app at [http://localhost:3000](http://localhost:3000).

```bash
pnpm dev
```

Edits in `packages/*` hot-reload in the example.

## Local development with Scaffold-ETH 2

Use this when you need to test changes against a real Scaffold-ETH 2 project.

1. From this repo, run all three packages in watch mode:

   ```bash
   cd packages/hooks && pnpm dev &
   cd packages/components && pnpm dev &
   cd packages/debug-contracts && pnpm dev &
   ```

2. In your Scaffold-ETH 2 repo, point `packages/nextjs/package.json` at your local checkout:

   ```json
   {
     "dependencies": {
       "@scaffold-ui/hooks": "file:../../../scaffold-ui/packages/hooks",
       "@scaffold-ui/components": "file:../../../scaffold-ui/packages/components",
       "@scaffold-ui/debug-contracts": "file:../../../scaffold-ui/packages/debug-contracts"
     }
   }
   ```

   The `../../../` paths assume `scaffold-ui` and your Scaffold-ETH 2 repo are siblings on disk.

3. Update `packages/nextjs/next.config.js` (or `.ts`) so webpack follows symlinks in dev:

   ```js
   webpack: (config, { dev }) => {
     config.resolve.fallback = { fs: false, net: false, tls: false };
     config.externals.push("pino-pretty", "lokijs", "encoding");
     if (dev) {
       config.watchOptions = { followSymlinks: true };
       config.snapshot.managedPaths = [];
     }
     return config;
   },
   ```

4. Install and run Scaffold-ETH 2:

   ```bash
   yarn install
   yarn chain    # one terminal
   yarn start    # another terminal
   ```

5. After every change in `scaffold-ui`, re-run `yarn install` in Scaffold-ETH 2.

## Editing docs

Docs live in `docs/pages/` as MDX. Run them locally:

```bash
cd docs && pnpm dev
```

## Submitting a PR

1. Fork the repo and create a branch.
2. Make your changes. Run lint and format before committing:

   ```bash
   pnpm lint
   pnpm format
   ```

3. If your PR changes a published package, add a [changeset](https://github.com/changesets/changesets):

   ```bash
   pnpm changeset
   ```

   Pick the affected packages, the bump type (patch/minor/major), and write a one-line summary. Skip this for docs-only or example-only changes.

4. Open a PR against `main`. Once merged, the [release workflow](.github/workflows/release.yml) opens a release PR; merging that publishes to npm.
