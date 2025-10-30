import TransactionComp from "../_components/TransactionComp";
import type { NextPage } from "next";
import { Hash } from "viem";
import { isZeroAddress } from "../../utils/common";
import { GenericContractsDeclaration } from "../../utils/decodeTxData";

type PageProps = { txHash?: Hash; deployedContracts: GenericContractsDeclaration | null };

const TransactionPage: NextPage<PageProps> = ({ txHash, deployedContracts }) => {
  if (txHash && isZeroAddress(txHash)) return null;

  return <TransactionComp txHash={txHash as Hash} deployedContracts={deployedContracts} />;
};
export { TransactionPage };
