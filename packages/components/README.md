# @scaffold-ui/components

React components for scaffold-ui applications.

## Installation

```bash
npm install @scaffold-ui/components
# or
yarn add @scaffold-ui/components
# or
pnpm add @scaffold-ui/components
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

#### Example

```tsx
import { Address } from "@scaffold-ui/components";

function MyComponent() {
  return (
    <Address
      address="0x1234567890123456789012345678901234567890"
      size="base"
      format="short"
      disableAddressLink={false}
      onlyEnsOrAddress={false}
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
