import { useFetchNativeCurrencyPrice } from "./useFetchNativeCurrencyPrice.js";
import { mainnet } from "viem/chains";

const MAX_DECIMALS_USD = 2;

function etherValueToUsd(etherValue: string, nativeCurrencyPrice: number) {
  const parsedEthValue = parseFloat(etherValue);
  if (Number.isNaN(parsedEthValue) || !nativeCurrencyPrice) {
    return "";
  }
  return (
    Math.round(parsedEthValue * nativeCurrencyPrice * 10 ** MAX_DECIMALS_USD) /
    10 ** MAX_DECIMALS_USD
  ).toString();
}

function usdValueToEth(usdValue: string, nativeCurrencyPrice: number) {
  const parsedUsdValue = parseFloat(usdValue);
  if (Number.isNaN(parsedUsdValue) || !nativeCurrencyPrice) {
    return "";
  }
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

  const valueInEth = usdMode ? usdValueToEth(value, nativeCurrencyPrice || 0) : value;
  const valueInUsd = usdMode ? value : etherValueToUsd(value, nativeCurrencyPrice || 0);

  return {
    valueInEth,
    valueInUsd,
    nativeCurrencyPrice,
    isNativeCurrencyPriceLoading,
    isNativeCurrencyPriceError,
  };
};
