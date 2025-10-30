import fs from "fs";
import path from "path";
import { Address } from "viem";
import { hardhat } from "viem/chains";
import { GenericContractsDeclaration } from "./decodeTxData";

async function fetchByteCodeAndAssembly(buildInfoDirectory: string, contractPath: string) {
  const buildInfoFiles = fs.readdirSync(buildInfoDirectory);
  let bytecode = "";
  let assembly = "";

  for (let i = 0; i < buildInfoFiles.length; i++) {
    const filePath = path.join(buildInfoDirectory, buildInfoFiles[i]);

    const buildInfo = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (buildInfo.output.contracts[contractPath]) {
      for (const contract in buildInfo.output.contracts[contractPath]) {
        bytecode = buildInfo.output.contracts[contractPath][contract].evm.bytecode.object;
        assembly = buildInfo.output.contracts[contractPath][contract].evm.bytecode.opcodes;
        break;
      }
    }

    if (bytecode && assembly) {
      break;
    }
  }

  return { bytecode, assembly };
}

export const getContractData = async ({
  dirname,
  address,
  contracts,
}: {
  dirname: string;
  address: Address;
  contracts: GenericContractsDeclaration | null;
}) => {
  const chainId = hardhat.id;

  if (!contracts || !contracts[chainId] || Object.keys(contracts[chainId]).length === 0) {
    return null;
  }

  let contractPath = "";

  const buildInfoDirectory = path.join(
    dirname,
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "..",
    "hardhat",
    "artifacts",
    "build-info",
  );

  if (!fs.existsSync(buildInfoDirectory)) {
    throw new Error(`Directory ${buildInfoDirectory} not found.`);
  }

  const deployedContractsOnChain = contracts[chainId];
  for (const [contractName, contractInfo] of Object.entries(deployedContractsOnChain)) {
    if (contractInfo.address.toLowerCase() === address.toLowerCase()) {
      contractPath = `contracts/${contractName}.sol`;
      break;
    }
  }

  if (!contractPath) {
    // No contract found at this address
    return null;
  }

  const { bytecode, assembly } = await fetchByteCodeAndAssembly(buildInfoDirectory, contractPath);

  return { bytecode, assembly };
};
