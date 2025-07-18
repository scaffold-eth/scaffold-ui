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
  const checkSumAddress = UseAddressOptions?.address ? getAddress(UseAddressOptions.address) : undefined;

  const { data: ens, isLoading: isEnsNameLoading } = useEnsName({
    address: checkSumAddress,
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ens ? normalize(ens) : undefined,
  });

  const shortAddress = checkSumAddress ? `${checkSumAddress.slice(0, 6)}...${checkSumAddress.slice(-4)}` : undefined;

  const isValidAddress = checkSumAddress ? isAddress(checkSumAddress) : false;
  const blockExplorerAddressLink = getBlockExplorerAddressLink(
    UseAddressOptions?.chain ?? mainnet,
    checkSumAddress ?? "",
  );

  return {
    checkSumAddress,
    ens,
    ensAvatar,
    isEnsNameLoading,
    blockExplorerAddressLink,
    isValidAddress,
    shortAddress,
    blockieUrl: UseAddressOptions.address ? blo(UseAddressOptions.address as `0x${string}`) : undefined,
  };
};
