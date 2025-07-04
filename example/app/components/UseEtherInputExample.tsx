"use client";
import React, { useState } from "react";
import { EtherInput } from "@scaffold-ui/components";
import { useEtherInput } from "@scaffold-ui/hooks";

export const UseEtherInputExample = () => {
  const [value, setValue] = useState("0.1");
  const [usdMode, setUsdMode] = useState(false);

  // Manual mode using the hook directly
  const [manualValue, setManualValue] = useState("1");
  const [manualUsdMode, setManualUsdMode] = useState(false);
  const { valueInEth, valueInUsd, nativeCurrencyPrice, isNativeCurrencyPriceLoading, isNativeCurrencyPriceError } =
    useEtherInput({ value: manualValue, usdMode: manualUsdMode });

  return (
    <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl">
      <h1 className="text-2xl font-bold mb-6">useEtherInput Hook & EtherInput Component Examples</h1>
      <p className="mb-4 text-gray-400 text-sm">
        Enter a value in ETH or USD and toggle the mode. The component uses the useEtherInput hook for conversion.
      </p>
      <EtherInput
        onValueChange={({ valueInEth, valueInUsd, usdMode }) =>
          console.log("value changed", valueInEth, valueInUsd, usdMode)
        }
      />

      <div className="space-y-4 border-t border-gray-700 pt-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-200">Manual Implementation (useEtherInput Hook)</h2>
        <p className="text-gray-400 text-sm mb-2">
          This section shows how to use the useEtherInput hook directly, without the EtherInput component.
        </p>
        <div className="flex items-center gap-2 mb-2">
          <input
            className="input input-bordered w-40"
            type="text"
            value={manualValue}
            onChange={(e) => setManualValue(e.target.value)}
            placeholder={manualUsdMode ? "Amount in USD" : "Amount in ETH"}
          />
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={() => setManualUsdMode((m) => !m)}
            disabled={isNativeCurrencyPriceLoading || isNativeCurrencyPriceError}
          >
            {manualUsdMode ? "USD" : "ETH"}
          </button>
        </div>
        <div className="text-xs text-gray-500 flex gap-4">
          <span>
            ETH: <span className="font-mono">{valueInEth || "-"}</span>
          </span>
          <span>
            USD: <span className="font-mono">{valueInUsd || "-"}</span>
          </span>
          {isNativeCurrencyPriceLoading && <span>Loading price...</span>}
          {isNativeCurrencyPriceError && <span>Error loading price</span>}
        </div>
      </div>
    </div>
  );
};
