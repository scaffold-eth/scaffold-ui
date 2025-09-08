import { Abi, AbiFunction, Address } from "viem";
import { useReadContract } from "wagmi";
import { useAnimationConfig } from "../hooks/useAnimationConfig";
import { useEffect } from "react";
import { getParsedError } from "../utils/getParsedError";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { InheritanceTooltip } from "./InheritanceTooltip";
import { displayTxResult } from "../utils/utilsDisplay";
import { notification } from "../utils/notification";

type DisplayVariableProps = {
  contractAddress: Address;
  abiFunction: AbiFunction;
  refreshDisplayVariables: boolean;
  inheritedFrom?: string;
  abi: Abi;
  chainId: number;
};

export const DisplayVariable = ({
  contractAddress,
  abiFunction,
  refreshDisplayVariables,
  abi,
  inheritedFrom,
  chainId,
}: DisplayVariableProps) => {
  const {
    data: result,
    isFetching,
    refetch,
    error,
  } = useReadContract({
    address: contractAddress,
    functionName: abiFunction.name,
    abi: abi,
    chainId: chainId,
    query: {
      retry: false,
    },
  });

  const { showAnimation } = useAnimationConfig(result);

  useEffect(() => {
    refetch();
  }, [refetch, refreshDisplayVariables]);

  useEffect(() => {
    if (error) {
      const parsedError = getParsedError(error);
      console.log("The parsedError is:", parsedError);
      notification.error(parsedError);
    }
  }, [error]);

  return (
    <div className="space-y-1 pb-2">
      <div className="flex items-center">
        <h3 className="font-medium text-lg mb-0 break-all">{abiFunction.name}</h3>
        <button
          className="p-1 text-sui-primary-content/60 hover:text-sui-primary-content hover:bg-sui-primary-neutral rounded transition-colors duration-200"
          onClick={async () => await refetch()}
        >
          {isFetching ? (
            <div className="w-3 h-3 border border-sui-primary-subtle border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <ArrowPathIcon className="h-3 w-3 cursor-pointer" aria-hidden="true" />
          )}
        </button>
        <InheritanceTooltip inheritedFrom={inheritedFrom} />
      </div>
      <div className="text-sui-primary-content/80 flex flex-col items-start">
        <div>
          <div
            className={`break-all block transition bg-transparent ${
              showAnimation ? "bg-warning rounded-xs animate-pulse-fast" : ""
            }`}
          >
            {displayTxResult(result)}
          </div>
        </div>
      </div>
    </div>
  );
};
