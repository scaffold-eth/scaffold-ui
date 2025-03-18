import { type Address as AddressType, type Chain } from "viem";
type UseAddressOptions = {
    address?: AddressType;
    chain?: Chain;
};
export declare function getBlockExplorerAddressLink(network: Chain, address: string): string;
export declare const useAddress: (UseAddressOptions: UseAddressOptions) => {
    checkSumAddress: `0x${string}` | undefined;
    ens: import("viem").GetEnsNameReturnType | undefined;
    ensAvatar: import("viem").GetEnsAvatarReturnType | undefined;
    isEnsNameLoading: boolean;
    blockExplorerAddressLink: string;
    isValidAddress: boolean;
    shortAddress: string | undefined;
    blockieUrl: string | undefined;
};
export {};
//# sourceMappingURL=useAddress.d.ts.map