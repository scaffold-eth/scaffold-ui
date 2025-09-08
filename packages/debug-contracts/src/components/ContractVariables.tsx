import { Abi, AbiFunction } from "abitype";
import { Address } from "viem";
import { GenericContract, InheritedFunctions } from "../types";
import { DisplayVariable } from "./DisplayVariable";

export const ContractVariables = ({
  refreshDisplayVariables,
  contract,
  chainId,
}: {
  refreshDisplayVariables: boolean;
  contract: {
    address: Address;
    abi: Abi;
  };
  chainId: number;
}) => {
  if (!contract) {
    return null;
  }

  const functionsToDisplay = ((contract.abi as Abi).filter((part) => part.type === "function") as AbiFunction[])
    .filter((fn) => {
      const isQueryableWithNoParams =
        (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length === 0;
      return isQueryableWithNoParams;
    })
    .map((fn) => {
      return {
        fn,
        inheritedFrom: ((contract as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[fn.name],
      };
    })
    .sort((a, b) => (b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1));

  if (!functionsToDisplay.length) {
    return <>No contract variables</>;
  }

  return (
    <>
      {functionsToDisplay.map(({ fn, inheritedFrom }) => (
        <DisplayVariable
          abi={contract.abi}
          chainId={chainId}
          abiFunction={fn}
          contractAddress={contract.address}
          key={fn.name}
          refreshDisplayVariables={refreshDisplayVariables}
          inheritedFrom={inheritedFrom}
        />
      ))}
    </>
  );
};
