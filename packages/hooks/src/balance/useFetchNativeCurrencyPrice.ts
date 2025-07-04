import { CurrencyAmount, Token } from "@uniswap/sdk-core";
import { Pair, Route } from "@uniswap/v2-sdk";
import { parseAbi, type Address, type Chain } from "viem";
import { mainnet } from "viem/chains";
import { usePublicClient } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { NETWORKS_EXTRA_DATA } from "../utils/networks.js";

/**
 * useFetchNativeCurrencyPrice Hook
 *
 * Fetches the current USD price of the native currency for a given chain using Uniswap V2 on mainnet.
 *
 * @param {Chain} [chain=mainnet] - (Optional) The blockchain network to fetch the native currency price for. Defaults to Ethereum mainnet.
 *
 * @returns {Object} An object containing:
 *   - price {number}: The current price of the native currency in USD.
 *   - isLoading {boolean}: Loading state for the price fetching process.
 *   - error {unknown}: Error object if fetching fails.
 *   - isError {boolean}: Error state for the price fetching process.
 *
 * @example
 * const { price, isLoading, isError } = useFetchNativeCurrencyPrice(mainnet);
 */
export const useFetchNativeCurrencyPrice = (chain: Chain = mainnet) => {
  const mainnetPublicClient = usePublicClient({ chainId: mainnet.id });

  const {
    data: price,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["native-currency-price", chain.id],
    queryFn: async () => {
      if (!mainnetPublicClient) return 0;
      return fetchPriceFromUniswap({ chain, mainnetPublicClient });
    },
    enabled: !!mainnetPublicClient,
  });

  return { price: price ?? 0, isLoading, error, isError };
};

const ABI = parseAbi([
  "function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function token0() external view returns (address)",
  "function token1() external view returns (address)",
]);

const fetchPriceFromUniswap = async ({
  chain,
  mainnetPublicClient,
}: {
  chain: Chain;
  mainnetPublicClient: NonNullable<ReturnType<typeof usePublicClient>>;
}) => {
  try {
    const nativeCurrencyTokenAddress = NETWORKS_EXTRA_DATA[chain.id]?.nativeCurrencyTokenAddress;
    const DAI = new Token(1, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18);
    const TOKEN = new Token(1, nativeCurrencyTokenAddress ?? "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18);
    const pairAddress = Pair.getAddress(TOKEN, DAI) as Address;

    const wagmiConfig = {
      address: pairAddress,
      abi: ABI,
    };

    const reserves = await mainnetPublicClient.readContract({
      ...wagmiConfig,
      functionName: "getReserves",
    });

    const token0Address = await mainnetPublicClient.readContract({
      ...wagmiConfig,
      functionName: "token0",
    });

    const token1Address = await mainnetPublicClient.readContract({
      ...wagmiConfig,
      functionName: "token1",
    });
    const token0 = [TOKEN, DAI].find((token) => token.address === token0Address) as Token;
    const token1 = [TOKEN, DAI].find((token) => token.address === token1Address) as Token;
    const pair = new Pair(
      CurrencyAmount.fromRawAmount(token0, reserves[0].toString()),
      CurrencyAmount.fromRawAmount(token1, reserves[1].toString()),
    );
    const route = new Route([pair], TOKEN, DAI);
    const price = parseFloat(route.midPrice.toSignificant(6));
    return price;
  } catch (error) {
    console.error(`useNativeCurrencyPrice - Error fetching ${chain.nativeCurrency.symbol} price from Uniswap: `, error);
    return 0;
  }
};
