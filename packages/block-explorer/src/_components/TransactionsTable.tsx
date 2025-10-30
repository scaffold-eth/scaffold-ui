import { TransactionHash } from "./TransactionHash";
import { Address } from "@scaffold-ui/components";
import { TransactionWithFunction } from "../utils/block";
import { Block, TransactionReceipt, formatEther } from "viem";

type TransactionReceipts = {
  [key: string]: TransactionReceipt;
};

export type TransactionsTableProps = {
  blocks: Block[];
  transactionReceipts: TransactionReceipts;
};

export const TransactionsTable = ({ blocks, transactionReceipts }: TransactionsTableProps) => {
  return (
    <div className="flex justify-center px-4 md:px-0">
      <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
        <table className="table text-xl bg-base-100 table-zebra w-full md:table-md table-sm">
          <thead>
            <tr className="rounded-xl text-sm text-base-content">
              <th className="bg-primary">Transaction Hash</th>
              <th className="bg-primary">Function Called</th>
              <th className="bg-primary">Block Number</th>
              <th className="bg-primary">Time Mined</th>
              <th className="bg-primary">From</th>
              <th className="bg-primary">To</th>
              <th className="bg-primary text-end">Value (ETH)</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) =>
              (block.transactions as TransactionWithFunction[]).map((tx) => {
                const receipt = transactionReceipts[tx.hash];
                const timeMined = new Date(Number(block.timestamp) * 1000).toLocaleString();
                const functionCalled = tx.input.substring(0, 10);

                return (
                  <tr key={tx.hash} className="hover text-sm">
                    <td className="w-1/12 md:py-4">
                      <TransactionHash hash={tx.hash} />
                    </td>
                    <td className="w-2/12 md:py-4">
                      {tx.functionName === "0x" ? "" : <span className="mr-1">{tx.functionName}</span>}
                      {functionCalled !== "0x" && (
                        <span className="badge badge-primary font-bold text-xs">{functionCalled}</span>
                      )}
                    </td>
                    <td className="w-1/12 md:py-4">{block.number?.toString()}</td>
                    <td className="w-2/12 md:py-4">{timeMined}</td>
                    <td className="w-2/12 md:py-4">
                      <Address
                        address={tx.from}
                        size="sm"
                        onlyEnsOrAddress
                        blockExplorerAddressLink={`/blockexplorer/address/${tx.from}`}
                      />
                    </td>
                    <td className="w-2/12 md:py-4">
                      {!receipt?.contractAddress ? (
                        tx.to && (
                          <Address
                            address={tx.to}
                            size="sm"
                            onlyEnsOrAddress
                            blockExplorerAddressLink={`/blockexplorer/address/${tx.to}`}
                          />
                        )
                      ) : (
                        <div className="relative">
                          <Address
                            address={receipt.contractAddress}
                            size="sm"
                            onlyEnsOrAddress
                            blockExplorerAddressLink={`/blockexplorer/address/${receipt.contractAddress}`}
                          />
                          <small className="absolute top-4 left-4">(Contract Creation)</small>
                        </div>
                      )}
                    </td>
                    <td className="text-right md:py-4">{formatEther(tx.value)} ETH</td>
                  </tr>
                );
              }),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
