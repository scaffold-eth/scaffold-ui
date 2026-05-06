---
name: scaffold-ui
description: "Add scaffold-ui's React components and hooks (Address, Balance, useAddress, useAddressInput and etc) to a Next.js or React dApp that already uses wagmi. Use this skill whenever the user wants to display Ethereum addresses, build address or ETH amount input fields with validation, show wallet balances with USD price conversion, add the scaffold-eth contract debugger UI to a non scaffold-eth-2 project. Also use when the user mentions scaffold-ui, @scaffold-ui/components, @scaffold-ui/hooks, or @scaffold-ui/debug-contracts by name even if they don't explicitly ask to install. This skill covers install gotchas, peer-dep ordering, provider wrapping order, the styles.css import, and the chain defaulting rule."
---

# scaffold-ui

For full API docs (every prop, every hook return value, every example), fetch https://ui.scaffoldeth.io/llms-full.txt. That's the complete docs as one file. This page covers what those docs the integration gotchas that bite agents when wiring scaffold-ui into a real project.

## Prerequisites

scaffold-ui doesn't ship its own provider stack. It expects yours. Before installing anything, verify the project has wagmi already wired:

- `wagmi` (^2.14) and `viem` (^2.23) in `package.json`
- A `WagmiProvider` somewhere in the app tree
- A `QueryClientProvider` from `@tanstack/react-query` wrapping it
- React 19 or newer (older versions install but break at runtime in subtle ways)

If wagmi isn't set up, stop and follow https://wagmi.sh/react/getting-started first. scaffold-ui on top of an unconfigured wagmi will fail.

## Install

scaffold-ui ships as three separate packages. The two you almost always want:

```bash
pnpm add @scaffold-ui/components @scaffold-ui/hooks
```

`@scaffold-ui/components` peer-depends on `@scaffold-ui/hooks` because the components call into the hooks internally. Installing only components fails the build with a missing-peer error. Install both even if your code doesn't import the hooks directly.

The third package, `@scaffold-ui/debug-contracts`, is opt-in. Skip it unless the user explicitly wants the SE-2 contract debugger UI in their project. It pulls in `@uniswap/sdk-core` and other deps that aren't needed for plain UI work.

After installing, import the styles in your root layout (`layout.tsx` for Next App Router, `app.tsx` for Vite or CRA):

```tsx
import "@scaffold-ui/components/styles.css";
```

Forgetting this import is a silent failure mode. The library ships pre-built CSS so Tailwind isn't required in the consuming app, but it doesn't conflict if Tailwind is already set up.

## Provider order

scaffold-ui hooks read wagmi state and react-query state via context. The provider tree must wrap children in this order:

```tsx
<WagmiProvider config={wagmiConfig}>
  <QueryClientProvider client={queryClient}>
    {/* optional: <RainbowKitProvider> goes here if used */}
    {children}
  </QueryClientProvider>
</WagmiProvider>
```

```ts
import { createConfig, http } from "wagmi";
import { base, mainnet, sepolia } from "viem/chains";

export const wagmiConfig = createConfig({
  chains: [base, mainnet, sepolia],
  ssr: true,
  client: ({ chain }) => createClient({ chain, transport: http() }),
});
```

## The chain defaulting rule

This is the gotcha that catches agents most often. Components that take a chain (Address, Balance, the input components) and hooks like `useBalance` accept an optional `chain` prop or param. When omitted, they default to **the first chain in your wagmi config**, falling back to `mainnet` only if the config has no chains at all.

Don't reflexively pass `chain={mainnet}` everywhere. If the user's app primarily targets Base or Arbitrum, hardcoding mainnet means ENS resolves on the wrong network and balances fetch from the wrong chain. Default behavior is almost always what you want. Pass `chain` explicitly only when a specific component needs to target a network regardless of the user's config (for example, an always-mainnet ENS lookup in a multi-chain app).

## Memoize the style prop

Components that accept a `style` prop pass it into a memoized child. If you build the style object inline, every parent render rebuilds it, breaks memoization, and triggers a re-render cascade:

```tsx
// good — stable reference
const addressStyle = useMemo(() => ({ fontSize: "1.5rem" }), []);
<Address address={user} style={addressStyle} />

// bad — new object every render
<Address address={user} style={{ fontSize: "1.5rem" }} />
```

This shows up as performance degradation on pages that render many `<Address />` instances at once (lists, tables, transaction histories). Memoize once, use everywhere.

## When to also install debug-contracts

`@scaffold-ui/debug-contracts` ports the Scaffold-ETH 2 (SE-2) contract debugger UI as a standalone React component. Install it only when:

- The user explicitly asks for the SE-2 debug UI in their project
- The user is migrating from SE-2 and wants the same dev workflow in a non-SE-2 app
- The user is building an admin or contract debug interface

Don't auto-install it just because the project has contracts.

## Verify the integration

Drop an `<Address />` somewhere visible:

```tsx
import { Address } from "@scaffold-ui/components";

<Address address="0xd8da6bf26964af9d7eed9e03e53415d37aa96045" />;
```

If you see `vitalik.eth` with a blockie avatar and the address links to a block explorer, then install + provider order + styles import + chain config are all correct. One observable check covers the whole integration.

If you see blank space or unstyled raw text, work through this list:

- Unstyled text → `styles.css` import is missing from your root layout
- "no QueryClient set" or wagmi error → provider wrapping order is wrong
- Hydration mismatch warning → `ssr: true` is missing from `createConfig`
- ENS not resolving → wagmi config doesn't include mainnet, or the wrong chain is being passed
