# Scaffold UI

React components and hooks for building Ethereum dApps. Drop them into any wagmi-based React app — no Scaffold-ETH 2 required.

**[Documentation](https://ui.scaffoldeth.io)** · **[Example app](https://scaffold-ui-example.vercel.app)** · **[Contributing](./CONTRIBUTING.md)**

## Packages

| Package                                                      | Description                                                                                      |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [`@scaffold-ui/components`](./packages/components)           | Pre-built React components — Address, Balance, AddressInput, EtherInput, BaseInput               |
| [`@scaffold-ui/hooks`](./packages/hooks)                     | React hooks the components are built on — useAddress, useAddressInput, useBalance, useEtherInput |
| [`@scaffold-ui/debug-contracts`](./packages/debug-contracts) | The Scaffold-ETH 2 contract debugger UI as a standalone component                                |

## Quick start

```bash
pnpm add @scaffold-ui/components @scaffold-ui/hooks
```

```tsx
import "@scaffold-ui/components/styles.css";
import { Address } from "@scaffold-ui/components";

<Address address="0xd8da6bf26964af9d7eed9e03e53415d37aa96045" />;
```

Your app needs `wagmi`, `viem`, and `@tanstack/react-query` already configured. See the [Getting Started guide](https://ui.scaffoldeth.io) for the full setup.

## Contributing

Bug reports, feature requests, and PRs welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for local development setup.

## License

MIT — see [LICENCE](./LICENCE).
