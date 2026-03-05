import { type Address as AddressType, type Chain, getAddress, isAddress } from "viem";
import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { blo } from "blo";
import { mainnet } from "viem/chains";

const HEDERA_CHAIN_IDS: Set<number> = new Set([295, 296]);

type UseAddressOptions = {
  address?: AddressType;
  chain?: Chain;
};

/** HashScan uses /account/ instead of /address/ for Hedera chains. */
export function getBlockExplorerAddressLink(network: Chain, address: string) {
  const blockExplorerBaseURL = network.blockExplorers?.default?.url;

  if (!blockExplorerBaseURL) {
    return HEDERA_CHAIN_IDS.has(network.id)
      ? `https://hashscan.io/testnet/account/${address}`
      : `https://etherscan.io/address/${address}`;
  }

  const pathSegment = HEDERA_CHAIN_IDS.has(network.id) ? "account" : "address";
  return `${blockExplorerBaseURL}/${pathSegment}/${address}`;
}

// make the chain optional, if not provided, it will use from wagmi conig
export const useAddress = (UseAddressOptions: UseAddressOptions) => {
  const checkSumAddress =
    UseAddressOptions?.address &&
    (isAddress(UseAddressOptions?.address) ? getAddress(UseAddressOptions.address) : undefined);

  const isValidAddress = Boolean(checkSumAddress);

  const { data: ens, isLoading: isEnsNameLoading } = useEnsName({
    address: checkSumAddress,
    chainId: 1,
    query: {
      enabled: isValidAddress,
    },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ens ? normalize(ens) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ens),
      gcTime: 30_000,
    },
  });

  const shortAddress = checkSumAddress ? `${checkSumAddress.slice(0, 6)}...${checkSumAddress.slice(-4)}` : undefined;

  const blockExplorerAddressLink = checkSumAddress
    ? getBlockExplorerAddressLink(UseAddressOptions?.chain ?? mainnet, checkSumAddress)
    : "";

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
