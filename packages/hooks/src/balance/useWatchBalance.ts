import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type UseBalanceParameters, useBalance, useBlockNumber } from "wagmi";
import type { Chain } from "viem";

type UseWatchBalanceOptions = {
  chain?: Chain;
} & UseBalanceParameters;

/**
 * useWatchBalance Hook
 *
 * Watches and updates the balance of an address on every new block for a given chain.
 *
 * @param {UseWatchBalanceOptions} useBalanceParameters - Parameters for fetching the balance, including address and optional chain.
 *
 * @returns {Object} The return value of wagmi's useBalance hook, containing:
 *   - data {object|undefined}: The balance data object.
 *   - isError {boolean}: Error state for balance fetching.
 *   - isLoading {boolean}: Loading state for balance fetching.
 *   - ...other wagmi useBalance return values.
 *
 * @example
 * const { data, isLoading } = useWatchBalance({ address: "0x123...", chain });
 */
export const useWatchBalance = (useBalanceParameters: UseWatchBalanceOptions) => {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true, chainId: useBalanceParameters.chain?.id });
  const { queryKey, ...restUseBalanceReturn } = useBalance({
    ...useBalanceParameters,
    chainId: useBalanceParameters.chain?.id,
  });

  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return restUseBalanceReturn;
};
