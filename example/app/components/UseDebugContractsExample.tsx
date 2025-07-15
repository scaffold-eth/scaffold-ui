"use client";
import { DebugContracts } from "@scaffold-ui/debug-contracts";
import { deployedContracts } from "../debug/deployedContracts";

export const UseDebugContractsExample = () => {
  return <DebugContracts contracts={deployedContracts} chainId={31337} />;
};
