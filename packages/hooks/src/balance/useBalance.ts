import { formatEther, type Address, type Chain } from "viem";
import { useFetchNativeCurrencyPrice } from "./useFetchNativeCurrencyPrice.js";
import { useCallback, useEffect, useState } from "react";
import { useWatchBalance } from "./useWatchBalance.js";

type UseBalanceOptions = {
  address: Address;
  chain: Chain;
  defaultUsdMode?: boolean;
};

// TODO: pooling
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
