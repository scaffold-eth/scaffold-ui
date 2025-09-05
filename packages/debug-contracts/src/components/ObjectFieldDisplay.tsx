import { TransactionBase, TransactionReceipt } from "viem";
import { displayTxResult } from "../utils/utilsDisplay";

type DisplayContent =
  | string
  | number
  | bigint
  | Record<string, any>
  | TransactionBase
  | TransactionReceipt
  | undefined
  | unknown;

type ResultFontSize = "sm" | "base" | "xs" | "lg" | "xl" | "2xl" | "3xl";

export const ObjectFieldDisplay = ({
  name,
  value,
  size,
  leftPad = true,
}: {
  name: string;
  value: DisplayContent;
  size: ResultFontSize;
  leftPad?: boolean;
}) => {
  return (
    <div className={`flex flex-row items-baseline ${leftPad ? "ml-4" : ""}`}>
      <span className="text-sui-primary-content/60 mr-2">{name}:</span>
      <span className="text-sui-primary-content">{displayTxResult(value, size)}</span>
    </div>
  );
};
