"use client";
import { useAccount } from "wagmi";
import { useAddress } from "@scaffold-ui/hooks";
import { blo } from "blo";

export const UseAddressExample = () => {
  const { address } = useAccount();

  const {
    checkSumAddress,
    ens,
    ensAvatar,
    isEnsNameLoading,
    blockExplorerAddressLink,
    isValidAddress,
    shortAddress,
  } = useAddress({
    address,
  });

  if (!address) {
    return (
      <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">useAddress Example</h1>
        <p>Connect your wallet to see the information</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl">
      <h1 className="text-2xl font-bold mb-6">useAddress Example</h1>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <img
            src={ensAvatar ?? blo(address)}
            alt="ENS Avatar"
            className="w-8 h-8 rounded-full"
          />
          {isEnsNameLoading ? (
            <div className="h-6 w-32 bg-gray-700 animate-pulse rounded" />
          ) : (
            <span className="text-lg font-medium">
              {ens ?? "No ENS name found"}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Address</span>
            <div className="flex items-center gap-2">
              <a
                href={blockExplorerAddressLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 truncate"
              >
                {checkSumAddress || address}
              </a>
              {isValidAddress && (
                <span className="text-xs text-green-500">✓ Valid</span>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Short Address</span>
            <span>{shortAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
