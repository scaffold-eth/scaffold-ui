"use client";

import React, { CSSProperties } from "react";
import { Address, Chain } from "viem";
import { useBalance } from "@scaffold-ui/hooks";
import { useAccount } from "wagmi";
import { mainnet } from "viem/chains";
import { DefaultStylesWrapper } from "./utils/ComponentWrapper";

export type BalanceProps = {
  address?: Address;
  chain?: Chain;
  defaultUsdMode?: boolean;
  style?: CSSProperties;
};

/**
 * Balance Component
 *
 * Displays the balance of a given Ethereum address, with support for toggling between native token (e.g., ETH) and USD value.
 * - Fetches and displays the balance for the provided address and chain.
 * - Allows toggling between native token and USD display by clicking the component.
 * - Shows a loading skeleton while fetching, and an error message if fetching fails.
 *
 * @param {BalanceProps} props - The props for the Balance component.
 * @param {Address} [props.address] - (Optional) The address to display the balance for.
 * @param {Chain} [props.chain] - (Optional) The blockchain network to use. Defaults to the connected chain or mainnet.
 * @param {boolean} [props.defaultUsdMode] - (Optional) If true, displays the balance in USD by default.
 * @param {CSSProperties} [props.style] - (Optional) Custom CSS styles to apply to the component.
 *   Performance Warning: Always memoize style objects to prevent unnecessary re-renders.
 *
 * @example
 * <Balance address="0x123..." />
 * <Balance address="0x123..." defaultUsdMode />
 * <Balance address="0x123..." chain={mainnet} />
 */
export const Balance: React.FC<BalanceProps> = ({ address, chain, defaultUsdMode, style }) => {
  const { chain: connectedChain } = useAccount();
  const chainToUse = chain ? chain : (connectedChain ?? mainnet);
  const { displayUsdMode, toggleDisplayUsdMode, formattedBalance, balanceInUsd, isLoading, isError, balance } =
    useBalance({ address, chain: chainToUse, defaultUsdMode });

  if (isLoading || !balance) {
    return (
      <DefaultStylesWrapper
        className="flex items-center animate-pulse"
        style={style}
      >
        <div className="h-4 w-20 bg-sui-skeleton-base rounded" />
      </DefaultStylesWrapper>
    );
  }

  if (isError) {
    return (
      <DefaultStylesWrapper
        className="border border-gray-300 rounded px-2 flex flex-col items-center max-w-fit text-sui-primary-content"
        style={style}
      >
        <div className="text-sui-warning text-sm">Error</div>
      </DefaultStylesWrapper>
    );
  }

  return (
    <DefaultStylesWrapper
      as="button"
      className="flex flex-col items-center font-normal bg-transparent focus:outline-none cursor-pointer text-sui-primary-content"
      onClick={toggleDisplayUsdMode}
      type="button"
      title="Toggle balance display mode"
      style={style}
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
            <span className="text-xs font-bold ml-1">{chainToUse?.nativeCurrency.symbol}</span>
          </div>
        )}
      </div>
    </DefaultStylesWrapper>
  );
};
