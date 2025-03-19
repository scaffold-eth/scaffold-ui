import { getAddress, isAddress, } from "viem";
import { normalize } from "viem/ens";
import { useEnsAvatar, useEnsName } from "wagmi";
import { blo } from "blo";
export function getBlockExplorerAddressLink(network, address) {
    const blockExplorerBaseURL = network.blockExplorers?.default?.url;
    if (!blockExplorerBaseURL) {
        return `https://etherscan.io/address/${address}`;
    }
    return `${blockExplorerBaseURL}/address/${address}`;
}
// make the chain optional, if not provided, it will use from wagmi conig
export const useAddress = (UseAddressOptions) => {
    const checkSumAddress = UseAddressOptions?.address
        ? getAddress(UseAddressOptions.address)
        : undefined;
    const { data: ens, isLoading: isEnsNameLoading } = useEnsName({
        address: checkSumAddress,
    });
    const { data: ensAvatar } = useEnsAvatar({
        name: ens ? normalize(ens) : undefined,
    });
    const shortAddress = checkSumAddress
        ? `${checkSumAddress.slice(0, 6)}...${checkSumAddress.slice(-4)}`
        : undefined;
    const isValidAddress = checkSumAddress ? isAddress(checkSumAddress) : false;
    const blockExplorerAddressLink = UseAddressOptions?.chain
        ? getBlockExplorerAddressLink(UseAddressOptions.chain, checkSumAddress ?? "")
        : "";
    return {
        checkSumAddress,
        ens,
        ensAvatar,
        isEnsNameLoading,
        blockExplorerAddressLink,
        isValidAddress,
        shortAddress,
        blockieUrl: UseAddressOptions.address
            ? blo(UseAddressOptions.address)
            : undefined,
    };
};
//# sourceMappingURL=useAddress.js.map