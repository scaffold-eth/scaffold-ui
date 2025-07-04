import { formatEther, type Address, type Chain } from "viem";
import { useFetchNativeCurrencyPrice } from "./useFetchNativeCurrencyPrice.js";
import { useCallback, useEffect, useState } from "react";
import { useWatchBalance } from "./useWatchBalance.js";

type UseBalanceOptions = {
  address: Address;
  chain: Chain;
  defaultUsdMode?: boolean;
};

/**
 * useBalance Hook
 *
 * Fetches and watches the balance of a given address on a specified chain, with USD conversion.
 * - Retrieves the native token balance for the provided address and chain.
 * - Fetches the USD price and allows toggling between native and USD display.
 *
 * @param {UseBalanceOptions} options - Options for fetching the balance.
 * @param {Address} [options.address] - The address to fetch the balance for.
 * @param {Chain} [options.chain] - The blockchain network to use.
 * @param {boolean} [options.defaultUsdMode=false] - (Optional) If true, displays the balance in USD by default. If the price is not fetched, the balance is displayed in native currency.
 *
 * @returns {Object} An object containing:
 *   - displayUsdMode {boolean}: Whether the balance is currently displayed in USD.
 *   - toggleDisplayUsdMode {() => void}: Function to toggle between native and USD display.
 *   - formattedBalance {number}: The balance in native currency, formatted as a number.
 *   - balanceInUsd {number}: The balance converted to USD.
 *   - balance {object|undefined}: The raw balance object (from wagmi).
 *   - isBalanceError {boolean}: Error state for balance fetching.
 *   - isBalanceLoading {boolean}: Loading state for balance fetching.
 *   - isNativeCurrencyPriceLoading {boolean}: Loading state for price fetching.
 *   - isNativeCurrencyPriceError {boolean}: Error state for price fetching.
 *   - isLoading {boolean}: Combined loading state.
 *   - isError {boolean}: Combined error state.
 *
 * @example
 * const { formattedBalance, balanceInUsd, displayUsdMode, toggleDisplayUsdMode } = useBalance({
 *   address: "0x123...",
 *   chain: mainnet,
 *   defaultUsdMode: true,
 * });
 */
export const useBalance = ({ address, chain, defaultUsdMode = false }: UseBalanceOptions) => {
  const {
    price: nativeCurrencyPrice,
    isLoading: isNativeCurrencyPriceLoading,
    isError: isNativeCurrencyPriceError,
  } = useFetchNativeCurrencyPrice(chain);
  const isPriceFetched = nativeCurrencyPrice > 0;
  const predefinedUsdMode = isPriceFetched ? Boolean(defaultUsdMode) : false;
  const [displayUsdMode, setDisplayUsdMode] = useState(predefinedUsdMode);

  const {
    data: balance,
    isError: isBalanceError,
    isLoading: isBalanceLoading,
  } = useWatchBalance({
    address,
    chain,
  });

  useEffect(() => {
    setDisplayUsdMode(predefinedUsdMode);
  }, [predefinedUsdMode]);

  const toggleDisplayUsdMode = useCallback(() => {
    if (isPriceFetched) {
      setDisplayUsdMode(!displayUsdMode);
    }
  }, [displayUsdMode, isPriceFetched]);

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;
  const balanceInUsd = formattedBalance * nativeCurrencyPrice;

  return {
    displayUsdMode,
    toggleDisplayUsdMode,
    formattedBalance,
    balanceInUsd,
    balance,
    isBalanceError,
    isBalanceLoading,
    isNativeCurrencyPriceLoading,
    isNativeCurrencyPriceError,
    isLoading: isBalanceLoading || isNativeCurrencyPriceLoading,
    isError: isBalanceError || isNativeCurrencyPriceError,
  };
};
