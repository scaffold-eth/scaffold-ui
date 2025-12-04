import { useFetchNativeCurrencyPrice } from "./useFetchNativeCurrencyPrice.js";
import { mainnet } from "viem/chains";

export const MAX_DECIMALS_USD = 2;

export const SIGNED_NUMBER_REGEX = /^-?\d*\.?\d*$/;

function etherValueToUsd(etherValue: string, nativeCurrencyPrice: number) {
  if (!etherValue || !nativeCurrencyPrice) {
    return "";
  }

  if (!SIGNED_NUMBER_REGEX.test(etherValue)) {
    throw new Error("Invalid ether value");
  }

  const parsedEthValue = parseFloat(etherValue);

  return (
    Math.round(parsedEthValue * nativeCurrencyPrice * 10 ** MAX_DECIMALS_USD) /
    10 ** MAX_DECIMALS_USD
  ).toString();
}

function usdValueToEth(usdValue: string, nativeCurrencyPrice: number) {
  if (!usdValue || !nativeCurrencyPrice) {
    return "";
  }

  if (!SIGNED_NUMBER_REGEX.test(usdValue)) {
    throw new Error("Invalid USD value");
  }

  const parsedUsdValue = parseFloat(usdValue);

  return (parsedUsdValue / nativeCurrencyPrice).toString();
}

/**
 * Hook for ETH/USD value conversion.
 * @param value - The value as entered by the user (in ETH or USD, depending on usdMode)
 * @param usdMode - true if value is USD, false if ETH
 */
export const useEtherInput = ({ value, usdMode }: { value: string; usdMode: boolean }) => {
  const {
    price: nativeCurrencyPrice,
    isLoading: isNativeCurrencyPriceLoading,
    isError: isNativeCurrencyPriceError,
  } = useFetchNativeCurrencyPrice(mainnet);

  let valueInEth = "";
  let valueInUsd = "";
  let error: string | null = null;

  try {
    valueInEth = usdMode ? usdValueToEth(value, nativeCurrencyPrice || 0) : value;
    valueInUsd = usdMode ? value : etherValueToUsd(value, nativeCurrencyPrice || 0);
  } catch (err: unknown) {
    error = (err as Error).message;
  }

  return {
    valueInEth,
    valueInUsd,
    error,
    isError: Boolean(error),
    nativeCurrencyPrice,
    isNativeCurrencyPriceLoading,
    isNativeCurrencyPriceError,
  };
};
