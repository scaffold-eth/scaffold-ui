"use client";
import { useAddress } from "@scaffold-ui/hooks";
import { Address } from "@scaffold-ui/components";
import { blo } from "blo";

export const UseAddressExample = () => {
  const address = "0x34aa3f359a9d614239015126635ce7732c18fdf3" as const;

  const { checkSumAddress, ens, ensAvatar, isEnsNameLoading, blockExplorerAddressLink, isValidAddress, shortAddress } =
    useAddress({
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
    <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl w-full">
      <h1 className="text-2xl font-bold mb-6">useAddress Hook & Address Component Examples</h1>

      <div className="space-y-8">
        {/* Address Component Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-[var(--color-sui-primary-content)]">Address Component Examples</h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Default (base size, short format)</span>
              <Address address={address} />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Large size with long format</span>
              <Address
                address={address}
                size="lg"
                format="long"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Extra large size</span>
              <Address
                address={address}
                size="xl"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Small size</span>
              <Address
                address={address}
                size="sm"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Extra small size</span>
              <Address
                address={address}
                size="xs"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">2XL size with long format</span>
              <Address
                address={address}
                size="2xl"
                format="long"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">3XL size</span>
              <Address
                address={address}
                size="3xl"
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Disabled address link</span>
              <Address
                address={address}
                size="base"
                disableAddressLink={true}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Only ENS or Address (no additional info)</span>
              <Address
                address={address}
                size="base"
                onlyEnsOrAddress={true}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Large, only ENS/Address, no link</span>
              <Address
                address={address}
                size="lg"
                onlyEnsOrAddress={true}
                disableAddressLink={true}
              />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Invalid address</span>
              <Address address="0x34aA3F359A9D61423901xyz" />
            </div>
          </div>
        </div>

        {/* Manual Implementation using useAddress hook */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-[var(--color-sui-primary-content)]">
            Manual Implementation (useAddress Hook)
          </h2>

          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ensAvatar ?? blo(address)}
              alt="ENS Avatar"
              className="w-8 h-8 rounded-full"
            />
            {isEnsNameLoading ? (
              <div className="h-6 w-32 bg-gray-700 animate-pulse rounded" />
            ) : (
              <span className="text-lg font-medium">{ens ?? "No ENS name found"}</span>
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
                {isValidAddress && <span className="text-xs text-green-500">✓ Valid</span>}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Short Address</span>
              <span>{shortAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
