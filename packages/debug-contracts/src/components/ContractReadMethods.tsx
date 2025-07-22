import { Abi, AbiFunction, Address } from "abitype";
import { GenericContract, InheritedFunctions } from "../types";
import { ReadOnlyFunctionForm } from "./ReadOnlyFunctionForm";

export const ContractReadMethods = ({
  contract,
  chainId,
}: {
  contract: {
    address: Address;
    abi: Abi;
  };
  chainId: number;
}) => {
  if (!contract) {
    return null;
  }

  const functionsToDisplay = (((contract.abi || []) as Abi).filter((part) => part.type === "function") as AbiFunction[])
    .filter((fn) => {
      const isQueryableWithParams =
        (fn.stateMutability === "view" || fn.stateMutability === "pure") && fn.inputs.length > 0;
      return isQueryableWithParams;
    })
    .map((fn) => {
      return {
        fn,
        inheritedFrom: ((contract as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[fn.name],
      };
    })
    .sort((a, b) => (b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1));

  if (!functionsToDisplay.length) {
    return <>No read methods</>;
  }

  return (
    <>
      {functionsToDisplay.map(({ fn, inheritedFrom }) => (
        <ReadOnlyFunctionForm
          chainId={chainId}
          abi={contract.abi}
          contractAddress={contract.address}
          abiFunction={fn}
          key={fn.name}
          inheritedFrom={inheritedFrom}
        />
      ))}
    </>
  );
};
