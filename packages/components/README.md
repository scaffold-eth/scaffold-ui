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

- `address` - The Ethereum address to display
- `chain` - The chain to use for block explorer links (optional)
- `showEns` - Whether to show ENS name if available (default: true)
- `showAvatar` - Whether to show blockie/ENS avatar (default: false)
- `showLink` - Whether to show link to block explorer (default: true)
- `showShortAddress` - Whether to display short format of address (default: true)
- `className` - Custom CSS classes
- `style` - Custom inline styles

#### Example

```tsx
import { Address } from "@scaffold-ui/components";

function MyComponent() {
  return (
    <Address
      address="0x1234567890123456789012345678901234567890"
      showAvatar={true}
      showEns={true}
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
