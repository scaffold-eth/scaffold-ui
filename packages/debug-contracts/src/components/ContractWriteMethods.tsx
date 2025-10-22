import { Abi, AbiFunction, Address } from "abitype";
import { WriteOnlyFunctionForm } from "./WriteOnlyFunctionForm";
import { GenericContract, InheritedFunctions } from "../types";

export const ContractWriteMethods = ({
  onChange,
  contract,
}: {
  onChange: () => void;
  contract: {
    address: Address;
    abi: Abi;
  };
}) => {
  if (!contract) {
    return null;
  }

  const functionsToDisplay = ((contract.abi as Abi).filter((part) => part.type === "function") as AbiFunction[])
    .filter((fn) => {
      const isWriteableFunction = fn.stateMutability !== "view" && fn.stateMutability !== "pure";
      return isWriteableFunction;
    })
    .map((fn) => {
      return {
        fn,
        inheritedFrom: ((contract as GenericContract)?.inheritedFunctions as InheritedFunctions)?.[fn.name],
      };
    })
    .sort((a, b) => (b.inheritedFrom ? b.inheritedFrom.localeCompare(a.inheritedFrom) : 1));

  if (!functionsToDisplay.length) {
    return <>No write methods</>;
  }

  return (
    <>
      {functionsToDisplay.map(({ fn, inheritedFrom }, idx) => (
        <WriteOnlyFunctionForm
          abi={contract.abi as Abi}
          key={`${fn.name}-${idx}}`}
          abiFunction={fn}
          onChange={onChange}
          contractAddress={contract.address}
          inheritedFrom={inheritedFrom}
        />
      ))}
    </>
  );
};
