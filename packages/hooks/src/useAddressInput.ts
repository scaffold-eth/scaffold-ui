import { useDebounceValue } from "usehooks-ts";
import { type Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { isENS } from "./utils/ens.js";

type UseAddressInputOptions = {
  value: string;
  debounceDelay?: number;
};

/**
 * useAddressInput Hook
 *
 * Handles address input with ENS resolution, avatar fetching, and debouncing.
 * - Resolves ENS names to addresses and vice versa.
 * - Fetches ENS avatars for resolved names.
 * - Debounces input to optimize RPC calls.
 * - Handles both address and ENS name inputs seamlessly.
 *
 * @param {UseAddressInputOptions} options - Options for address input handling.
 * @param {string} options.value - The input value (can be an address or ENS name).
 * @param {number} [options.debounceDelay=500] - (Optional) Debounce delay in milliseconds for ENS resolution.
 *
 * @returns {Object} An object containing:
 *   - ensAddress {Address|undefined}: The resolved address from ENS name.
 *   - isEnsAddressLoading {boolean}: Loading state for ENS address resolution.
 *   - isEnsAddressError {boolean}: Error state for ENS address resolution.
 *   - isEnsAddressSuccess {boolean}: Success state for ENS address resolution.
 *   - ensAvatar {string|undefined}: The ENS avatar URL.
 *   - isEnsAvatarLoading {boolean}: Loading state for ENS avatar fetching.
 *   - isEnsAvatarError {boolean}: Error state for ENS avatar fetching.
 *   - isEnsAvatarSuccess {boolean}: Success state for ENS avatar fetching.
 *   - ensName {string|undefined}: The resolved ENS name from address.
 *   - isEnsNameLoading {boolean}: Loading state for ENS name resolution.
 *   - isEnsNameError {boolean}: Error state for ENS name resolution.
 *   - isEnsNameSuccess {boolean}: Success state for ENS name resolution.
 *   - settledValue {string|undefined}: The debounced and validated input value.
 *   - debouncedValue {string}: The debounced input value.
 *
 * @example
 * const { ensAddress, ensName, ensAvatar, isEnsAddressLoading } = useAddressInput({
 *   value: "vitalik.eth",
 *   debounceDelay: 300,
 * });
 */
export function useAddressInput({ value, debounceDelay = 500 }: UseAddressInputOptions) {
  // Debounce the input to keep clean RPC calls when resolving ENS names
  // If the input is an address, we don't need to debounce it
  const [_debouncedValue] = useDebounceValue(value, debounceDelay);
  const debouncedValue = isAddress(value) ? value : _debouncedValue;
  const isDebouncedValueLive = debouncedValue === value;

  // If the user changes the input after an ENS name is already resolved, we want to remove the stale result
  const settledValue = isDebouncedValueLive ? debouncedValue : undefined;

  const {
    data: ensAddress,
    isLoading: isEnsAddressLoading,
    isError: isEnsAddressError,
    isSuccess: isEnsAddressSuccess,
  } = useEnsAddress({
    name: settledValue,
    chainId: 1,
    query: {
      gcTime: 30_000,
      enabled: isDebouncedValueLive && isENS(debouncedValue),
    },
  });

  const {
    data: ensName,
    isLoading: isEnsNameLoading,
    isError: isEnsNameError,
    isSuccess: isEnsNameSuccess,
  } = useEnsName({
    address: settledValue as Address,
    chainId: 1,
    query: {
      enabled: isAddress(debouncedValue),
      gcTime: 30_000,
    },
  });

  const {
    data: ensAvatar,
    isLoading: isEnsAvatarLoading,
    isError: isEnsAvatarError,
    isSuccess: isEnsAvatarSuccess,
  } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
      gcTime: 30_000,
    },
  });

  return {
    ensAddress,
    isEnsAddressLoading,
    isEnsAddressError,
    isEnsAddressSuccess,
    ensAvatar,
    isEnsAvatarLoading,
    isEnsAvatarError,
    isEnsAvatarSuccess,
    ensName,
    isEnsNameLoading,
    isEnsNameError,
    isEnsNameSuccess,
    settledValue,
    debouncedValue,
  };
}
