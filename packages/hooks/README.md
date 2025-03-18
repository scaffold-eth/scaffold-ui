# @scaffold-ui/hooks

A collection of React hooks for managing UI state.

## Installation

```bash
npm install @scaffold-ui/hooks
# or
yarn add @scaffold-ui/hooks
```

## Hooks

### useAddress

A hook for managing address information.

```tsx
import { useAddress } from "@scaffold-ui/hooks";

function AddressForm() {
  const { address, setAddress, resetAddress } = useAddress({
    country: "United States", // Optional initial value
  });

  const handleStreetChange = (e) => {
    setAddress({ street: e.target.value });
  };

  return (
    <form>
      <input
        value={address.street}
        onChange={handleStreetChange}
        placeholder="Street"
      />
      {/* More form fields */}
      <button type="button" onClick={resetAddress}>
        Reset
      </button>
    </form>
  );
}
```

## License

MIT
