import { Address, Balance } from "@scaffold-ui/components";
import { useReducer } from "react";
import { Abi, type Address as AddressType } from "viem";
import { ContractVariables } from "./components/ContractVariables";
import { ContractReadMethods } from "./components/ContractReadMethods";
import { ContractWriteMethods } from "./components/ContractWriteMethods";
import { Toaster } from "react-hot-toast";

export type ContractProps = {
  contractName: string;
  contract: {
    address: AddressType;
    abi: Abi;
  };
  chainId: number;
};

export const Contract: React.FC<ContractProps> = ({ contractName, contract, chainId }) => {
  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer((value) => !value, false);

  return (
    <>
      <div className={`grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0`}>
        <div className="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="col-span-1 flex flex-col">
            <div className="bg-sui-base-100 border-sui-primary-subtle dark:border-sui-primary border shadow-md shadow-sui-primary-subtle rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <span className="font-bold">{contractName}</span>
                  <Address address={contract.address} onlyEnsOrAddress size="base" />
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-sm">Balance:</span>
                    {contract.address && <Balance address={contract.address} />}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-sui-primary-subtle dark:bg-sui-primary rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-sui-primary-subtle dark:shadow-sui-primary overflow-y-auto">
              <ContractVariables
                refreshDisplayVariables={refreshDisplayVariables}
                contract={contract}
                chainId={chainId}
              />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
            <div className="z-10">
              <div className="bg-sui-base-100 rounded-3xl shadow-md shadow-sui-primary-subtle border border-sui-primary-subtle dark:border-sui-primary flex flex-col mt-10 relative">
                <div className="h-[5rem] w-[5.5rem] bg-sui-primary-subtle dark:bg-sui-primary absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-sui-primary-subtle dark:shadow-sui-primary">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="my-0 text-sm">Read</p>
                  </div>
                </div>
                <div className="p-5 divide-y divide-sui-primary-subtle">
                  <ContractReadMethods contract={contract} chainId={chainId} />
                </div>
              </div>
            </div>
            <div className="z-10">
              <div className="bg-sui-base-100 rounded-3xl shadow-md shadow-sui-primary-subtle dark:border-sui-primary border border-sui-primary-subtle flex flex-col mt-10 relative">
                <div className="h-[5rem] w-[5.5rem] bg-sui-primary-subtle dark:bg-sui-primary absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-sui-primary-subtle dark:shadow-sui-primary">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="my-0 text-sm">Write</p>
                  </div>
                </div>
                <div className="p-5 divide-y divide-sui-primary-subtle">
                  <ContractWriteMethods
                    contract={contract}
                    onChange={triggerRefreshDisplayVariables}
                    chainId={chainId}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};
