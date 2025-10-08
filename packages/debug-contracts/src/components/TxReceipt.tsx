import { useState } from "react";
import { TransactionReceipt } from "viem";
import { CheckCircleIcon, DocumentDuplicateIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { ObjectFieldDisplay, replacer } from "../utils/utilsDisplay";

export const TxReceipt = ({ txResult }: { txResult: TransactionReceipt }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { copyToClipboard: copyTxResultToClipboard, isCopiedToClipboard: isTxResultCopiedToClipboard } =
    useCopyToClipboard();

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`text-sm bg-sui-primary-subtle ${isExpanded ? "rounded-t-3xl" : "rounded-3xl"} min-h-0 py-0`}>
      <div className="flex items-center">
        <div className="mt-1 pl-2 flex-shrink-0">
          {isTxResultCopiedToClipboard ? (
            <CheckCircleIcon
              className="ml-1.5 text-xl font-normal text-sui-primary-content h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          ) : (
            <DocumentDuplicateIcon
              className="ml-1.5 text-xl font-normal h-5 w-5 cursor-pointer"
              aria-hidden="true"
              onClick={() => copyTxResultToClipboard(JSON.stringify(txResult, replacer, 2))}
            />
          )}
        </div>
        <div
          className="flex-1 flex items-center justify-between cursor-pointer py-1.5 pl-1 pr-4"
          onClick={toggleExpanded}
        >
          <strong className="text-sm">Transaction Receipt</strong>
          <ChevronDownIcon
            className={`h-4 w-4 transition-transform duration-200 flex-shrink-0 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      <div
        className={`overflow-auto transition-all duration-300 ease-in-out rounded-b-3xl ${
          isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="overflow-auto bg-sui-primary-subtle rounded-b-3xl border-t border-gray-300/20">
          <pre className="text-xs p-4 whitespace-pre-wrap break-words rounded-b-3xl">
            {Object.entries(txResult).map(([k, v]) => (
              <ObjectFieldDisplay name={k} value={v} size="xs" leftPad={false} key={k} />
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
};
