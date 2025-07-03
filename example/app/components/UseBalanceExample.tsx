"use client";
import { useBalance } from "@scaffold-ui/hooks";
import { Balance } from "@scaffold-ui/components";
import { mainnet } from "viem/chains";

export const UseBalanceExample = () => {
  // atg.eth
  const address = "0x34aa3f359a9d614239015126635ce7732c18fdf3" as const;

  const { displayUsdMode, toggleDisplayUsdMode, formattedBalance, balanceInUsd, isLoading, isError } = useBalance({
    address,
    chain: mainnet,
  });

  if (!address) {
    return (
      <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl">
        <h1 className="text-2xl font-bold mb-6">useBalance Example</h1>
        <p>Connect your wallet to see the balance information</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl">
      <h1 className="text-2xl font-bold mb-6">useBalance Hook & Balance Component Examples</h1>

      <div className="space-y-8">
        {/* Balance Component Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">Balance Component Examples</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-1 self-start">Default (ETH, click to toggle USD)</span>
              <Balance address={address} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-1 self-start">USD mode by default</span>
              <Balance address={address} usdMode={true} />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-1 self-start">Custom className</span>
              <Balance address={address} className="text-lg text-green-400" />
            </div>
          </div>
        </div>

        {/* Manual Implementation using useBalance hook */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-200">Manual Implementation (useBalance Hook)</h2>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-gray-500">Balance</span>
            <button
              className="flex items-center gap-2 px-3 py-1 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
              onClick={toggleDisplayUsdMode}
              type="button"
              title="Toggle balance display mode"
            >
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : isError ? (
                <span className="text-red-500">Error</span>
              ) : displayUsdMode ? (
                <>
                  <span className="text-xs font-bold mr-1">$</span>
                  <span>{balanceInUsd.toFixed(2)}</span>
                </>
              ) : (
                <>
                  <span>{formattedBalance.toFixed(4)}</span>
                  <span className="text-xs font-bold ml-1">ETH</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
