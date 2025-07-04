import { useDebounceValue } from "usehooks-ts";
import { type Address, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAddress, useEnsAvatar, useEnsName } from "wagmi";
import { isENS } from "./utils/ens.js";

export function useAddressInput({ value, debounceDelay = 500 }: { value: string; debounceDelay?: number }) {
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
