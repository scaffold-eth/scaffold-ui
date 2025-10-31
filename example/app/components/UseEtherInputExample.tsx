"use client";
import React, { CSSProperties, useState } from "react";
import { EtherInput } from "@scaffold-ui/components";
import { useEtherInput } from "@scaffold-ui/hooks";

export const UseEtherInputExample = () => {
  const [manualValue, setManualValue] = useState("1");
  const [manualUsdMode, setManualUsdMode] = useState(false);
  const { valueInEth, valueInUsd, nativeCurrencyPrice, isNativeCurrencyPriceLoading, isNativeCurrencyPriceError } =
    useEtherInput({ value: manualValue, usdMode: manualUsdMode });

  return (
    <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl">
      <h1 className="text-2xl font-bold mb-6">useEtherInput Hook & EtherInput Component Examples</h1>
      <div className="space-y-4">
        {/* EtherInput Component Examples */}
        <h2 className="text-xl font-semibold text-[var(--color-sui-primary-content)]">EtherInput Component Examples</h2>
        <div className="space-y-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1 self-start">Default (ETH, click to toggle USD)</span>
            <EtherInput
              name="ether-input-default"
              onValueChange={({ valueInEth, valueInUsd, displayUsdMode }) =>
                console.log("value changed", valueInEth, valueInUsd, displayUsdMode)
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1 self-start">USD mode by default</span>
            <EtherInput
              name="ether-input-usd-mode"
              defaultUsdMode
              onValueChange={({ valueInEth, valueInUsd, displayUsdMode }) =>
                console.log("value changed", valueInEth, valueInUsd, displayUsdMode)
              }
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1 self-start">Disabled</span>
            <EtherInput name="ether-input-disabled" disabled />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1 self-start">Default value</span>
            <EtherInput name="ether-input-default-value" defaultValue="10" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500 mb-1 self-start">Custom</span>
            <EtherInput
              name="ether-input-usd-mode"
              defaultUsdMode
              onValueChange={({ valueInEth, valueInUsd, displayUsdMode }) =>
                console.log("value changed", valueInEth, valueInUsd, displayUsdMode)
              }
              style={
                {
                  "--color-sui-input-border": "#eab308",
                  "--color-sui-input-background": "#fef9c3",
                  "--color-sui-input-text": "#713f12",
                } as CSSProperties
              }
            />
          </div>
        </div>
      </div>

      {/* Manual Implementation using useEtherInput Hook */}
      <div className="space-y-4 border-t border-gray-700 pt-6 mt-8">
        <h2 className="text-xl font-semibold text-[var(--color-sui-primary-content)]">
          Manual Implementation (useEtherInput Hook)
        </h2>
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
          {nativeCurrencyPrice && <span>ETH Price: {nativeCurrencyPrice}</span>}
        </div>
      </div>
    </div>
  );
};
