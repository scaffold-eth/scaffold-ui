import { type Address as AddressType, type Chain, getAddress, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { blo } from "blo";
import { mainnet } from "viem/chains";

type UseAddressOptions = {
  address?: AddressType;
  chain?: Chain;
};

export function getBlockExplorerAddressLink(network: Chain, address: string) {
  const blockExplorerBaseURL = network.blockExplorers?.default?.url;

  if (!blockExplorerBaseURL) {
    return `https://etherscan.io/address/${address}`;
  }

  return `${blockExplorerBaseURL}/address/${address}`;
}

// make the chain optional, if not provided, it will use from wagmi conig
export const useAddress = (UseAddressOptions: UseAddressOptions) => {
  const checkSumAddress =
    UseAddressOptions?.address &&
    (isAddress(UseAddressOptions?.address) ? getAddress(UseAddressOptions.address) : undefined);

  const { data: ens, isLoading: isEnsNameLoading } = useEnsName({
    address: checkSumAddress,
    chainId: 1,
    query: {
      // Only fetch ENS when address is valid (checkSumAddress will be undefined for invalid addresses)
      enabled: !!checkSumAddress,
    },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ens ? normalize(ens) : undefined,
    chainId: 1,
    query: {
      // Only fetch avatar when we have both valid address and ENS name
      enabled: !!checkSumAddress && Boolean(ens),
      gcTime: 30_000,
    },
  });

  const shortAddress = checkSumAddress ? `${checkSumAddress.slice(0, 6)}...${checkSumAddress.slice(-4)}` : undefined;

  // If checkSumAddress exists, it means the address is valid (already validated by isAddress check above)
  // So we can directly use !!checkSumAddress instead of calling isAddress again
  const isValidAddress = !!checkSumAddress;

  const blockExplorerAddressLink = checkSumAddress
    ? getBlockExplorerAddressLink(UseAddressOptions?.chain ?? mainnet, checkSumAddress)
    : "";

  // Use checkSumAddress for blockie generation to ensure consistency
  const blockieUrl = checkSumAddress ? blo(checkSumAddress) : undefined;

  return {
    checkSumAddress,
    ens,
    ensAvatar,
    isEnsNameLoading,
    blockExplorerAddressLink,
    isValidAddress,
    shortAddress,
    blockieUrl,
  };
};
