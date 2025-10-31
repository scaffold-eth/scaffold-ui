import { createContext, useContext, ReactNode } from "react";
import { Chain } from "viem";

export type ContractConfig = {
  blockExplorerAddressLink?: string;
  chain: Chain;
  chainId: number;
};

const ContractConfigContext = createContext<ContractConfig | undefined>(undefined);

export const ContractConfigProvider = ({ children, config }: { children: ReactNode; config: ContractConfig }) => {
  return <ContractConfigContext.Provider value={config}>{children}</ContractConfigContext.Provider>;
};

export const useContractConfig = () => {
  const context = useContext(ContractConfigContext);
  if (context === undefined) {
    throw new Error("useContractConfig must be used within a ContractConfigProvider");
  }
  return context;
};
