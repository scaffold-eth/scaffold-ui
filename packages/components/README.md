# @scaffold-ui/components

Pre-built React components for Ethereum dApps — addresses with ENS, balances, address inputs, ETH amount inputs.

**[Documentation](https://ui.scaffoldeth.io/components)** · [Repo](https://github.com/scaffold-eth/scaffold-ui)

## Install

```bash
npm install @scaffold-ui/components @scaffold-ui/hooks
# or
yarn add @scaffold-ui/components @scaffold-ui/hooks
# or
pnpm add @scaffold-ui/components @scaffold-ui/hooks
```

`@scaffold-ui/components` peer-depends on `@scaffold-ui/hooks`. You also need `react`, `viem`, `wagmi`, and `@tanstack/react-query` configured in your app.

## Usage

Import the styles once in your root layout, then use any component:

```tsx
import "@scaffold-ui/components/styles.css";
import { Address } from "@scaffold-ui/components";

export default function Profile() {
  return <Address address="0xd8da6bf26964af9d7eed9e03e53415d37aa96045" />;
}
```

See the [docs](https://ui.scaffoldeth.io/components) for the full component list, props, and examples.

## License

MIT
