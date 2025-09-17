"use client";
import { Contract } from "@scaffold-ui/debug-contracts";
import { deployedContracts } from "../debug/deployedContracts";
import { sepolia } from "viem/chains";
import { useMemo, useState } from "react";

export const UseDebugContractsExample = () => {
  const contractsData = useMemo(() => deployedContracts?.[sepolia.id] || {}, []);

  const contractNames = useMemo(
    () =>
      Object.keys(contractsData).sort((a, b) => {
        return a.localeCompare(b, undefined, {
          numeric: true,
          sensitivity: "base",
        });
      }),
    [contractsData],
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
                  className={`font-light hover:border-transparent p-2 px-4 rounded-full ${
                    contractName === selectedContract
                      ? "bg-[var(--color-sui-primary-subtle)] hover:bg-[var(--color-sui-primary-subtle)] no-animation"
                      : "bg-[var(--color-sui-base-100)] hover:bg-[var(--color-sui-primary-subtle)]"
                  }`}
                  key={contractName}
                  onClick={() => setSelectedContract(contractName)}
                >
                  {contractName}
                </button>
              ))}
            </div>
          )}
          <Contract
            contractName={selectedContract}
            contract={contractsData[selectedContract as keyof typeof contractsData]}
            chainId={sepolia.id}
          />
        </>
      )}
    </div>
  );
};
