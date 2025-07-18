# @scaffold-ui/debug-contracts

Debug contracts component for scaffold-ui.

## Installation

```bash
npm install @scaffold-ui/debug-contracts
# or
yarn add @scaffold-ui/debug-contracts
# or
pnpm add @scaffold-ui/debug-contracts
```

## Usage

```tsx
import { DebugContracts } from "@scaffold-ui/debug-contracts";
import "@scaffold-ui/debug-contracts/styles.css";
import type { Address } from "viem";

function App() {
  const contractAddress: Address = "0x1234567890123456789012345678901234567890";

  return <DebugContracts contractAddress={contractAddress} />;
}
```

## Components

### DebugContracts

A component for debugging smart contracts with read/write functionality.

#### Props

- `contractAddress` (optional): The address of the contract to debug (`Address` type from viem)
- `className` (optional): Additional CSS classes to apply

## Development

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the package
pnpm build

# Run linting
pnpm lint

# Run type checking
pnpm typecheck
```
