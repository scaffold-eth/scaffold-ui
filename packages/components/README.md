# @scaffold-ui/components

React components for scaffold-ui applications.

## Installation

**Note**: This package requires `@scaffold-ui/hooks` as a peer dependency.

```bash
# Install both packages
npm install @scaffold-ui/components @scaffold-ui/hooks

# Or with yarn
yarn add @scaffold-ui/components @scaffold-ui/hooks

# Or with pnpm
pnpm add @scaffold-ui/components @scaffold-ui/hooks
```

### Peer Dependencies

You'll also need these peer dependencies if you don't already have them:

```bash
npm install react @types/react viem wagmi @tanstack/react-query
```

## Components

### Address

A React component for displaying Ethereum addresses with ENS support, avatars, and block explorer links.

#### Props

- `address?` - The Ethereum address to display (optional)
- `disableAddressLink?` - Whether to disable the link to block explorer (optional)
- `format?` - Display format for the address - "short" | "long" (optional)
- `size` - Size of the component - "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" (required)
- `onlyEnsOrAddress?` - Whether to show only ENS name or address without additional info (optional)
- `chain?` - The blockchain chain to use for block explorer links and ENS resolution (optional, defaults to mainnet)

#### Example

```tsx
import { Address } from "@scaffold-ui/components";
import { optimism } from "viem/chains";

function MyComponent() {
  return (
    <Address
      address="0x1234567890123456789012345678901234567890"
      size="base"
      format="short"
      disableAddressLink={false}
      onlyEnsOrAddress={false}
      chain={optimism} // Optional: specify chain for block explorer links
    />
  );
}
```

## Development

```bash
# Install dependencies
pnpm install

# Build the package
pnpm build

# Watch for changes during development
pnpm dev

# Lint the code
pnpm lint

# Format the code
pnpm format
```
