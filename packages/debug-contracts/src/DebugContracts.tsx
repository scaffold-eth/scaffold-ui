import React, { useMemo, useState } from "react";
import type { Address as AddressType } from "viem";
import { GenericContractsDeclaration } from "./types";
import { ContractUI } from "./ContractUI";

export type DebugContractsProps = {
  contractAddress?: AddressType;
  contracts: GenericContractsDeclaration;
  chainId: number;
};

export const DebugContracts: React.FC<DebugContractsProps> = ({ contracts, chainId }) => {
  const contractsData = contracts?.[chainId] || {};

  const contractNames = useMemo(
    () =>
      Object.keys(contractsData).sort((a, b) => {
        return a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }) as string[],
    [contracts],
  );
  const [selectedContract, setSelectedContract] = useState(contractNames[0]);

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      {contractNames.length === 0 ? (
        <p className="text-3xl mt-14">No contracts found!</p>
      ) : (
        <>
          {contractNames.length > 1 && (
            <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
              {contractNames.map((contractName) => (
                <button
                  className={`font-light hover:border-transparent ${
                    contractName === selectedContract
                      ? "bg-base-300 hover:bg-base-300 no-animation"
                      : "bg-base-100 hover:bg-secondary"
                  }`}
                  key={contractName}
                  onClick={() => setSelectedContract(contractName)}
                >
                  {contractName}
                </button>
              ))}
            </div>
          )}
          <ContractUI contractName={selectedContract} contract={contractsData[selectedContract]} />
        </>
      )}
    </div>
  );
};
