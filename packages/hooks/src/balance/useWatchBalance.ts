import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { type UseBalanceParameters, useBalance, useBlockNumber } from "wagmi";
import type { Chain } from "viem";
import { mainnet } from "viem/chains";

type UseWatchBalanceOptions = {
  chain?: Chain;
} & UseBalanceParameters;

/**
 * Wrapper around wagmi's useBalance hook. Updates data on every block change.
 */
export const useWatchBalance = (useBalanceParameters: UseWatchBalanceOptions) => {
  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({ watch: true, chainId: useBalanceParameters.chain?.id ?? mainnet.id });
  const { queryKey, ...restUseBalanceReturn } = useBalance(useBalanceParameters);

  useEffect(() => {
    void queryClient.invalidateQueries({ queryKey });
  }, [blockNumber]);

  return restUseBalanceReturn;
};
