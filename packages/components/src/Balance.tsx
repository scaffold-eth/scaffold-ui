import React from "react";
import { Address, Chain } from "viem";
import { useBalance } from "@scaffold-ui/hooks";
import { mainnet } from "viem/chains";

export type BalanceProps = {
  address: Address;
  chain?: Chain;
  className?: string;
  usdMode?: boolean;
};

/**
 * Display (ETH & USD) balance of an address, with click-to-toggle.
 */
export const Balance: React.FC<BalanceProps> = ({ address, chain = mainnet, className = "", usdMode }) => {
  const { displayUsdMode, toggleDisplayUsdMode, formattedBalance, balanceInUsd, isLoading, isError, balance } =
    useBalance({ address, chain, defaultUsdMode: usdMode });

  if (isLoading || !balance) {
    return (
      <div className="flex items-center animate-pulse">
        <div className="h-4 w-20 bg-gray-200 rounded" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border border-gray-300 rounded px-2 flex flex-col items-center max-w-fit">
        <div className="text-yellow-400 text-sm">Error</div>
      </div>
    );
  }

  return (
    <button
      className={`flex flex-col items-center font-normal bg-transparent focus:outline-none cursor-pointer ${className}`}
      onClick={toggleDisplayUsdMode}
      type="button"
      title="Toggle balance display mode"
    >
      <div className="flex items-center justify-center">
        {displayUsdMode ? (
          <>
            <span className="text-xs font-bold mr-1">$</span>
            <span>{balanceInUsd.toFixed(2)}</span>
          </>
        ) : (
          <div className="flex items-center">
            <span>{formattedBalance.toFixed(4)}</span>
            <span className="text-xs font-bold ml-1">{chain.nativeCurrency.symbol}</span>
          </div>
        )}
      </div>
    </button>
  );
};
