"use client";
import { DebugContracts } from "@scaffold-ui/debug-contracts";
import { deployedContracts } from "../debug/deployedContracts";
import { hardhat } from "viem/chains";

export const UseDebugContractsExample = () => {
  return <DebugContracts contracts={deployedContracts} chainId={hardhat.id} />;
};
