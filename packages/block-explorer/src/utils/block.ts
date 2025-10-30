import { Transaction } from "viem";

export type TransactionWithFunction = Transaction & {
  functionName?: string;
  functionArgs?: any[];
  functionArgNames?: string[];
  functionArgTypes?: string[];
};
