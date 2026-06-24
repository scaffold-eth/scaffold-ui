"use client";
import React, { useState } from "react";
import { useEtherInput } from "@scaffold-ui/hooks";

export function UseEtherInputBasicExample() {
  const [value, setValue] = useState("");
  const [usdMode, setUsdMode] = useState(false);
  const { valueInEth, valueInUsd, isNativeCurrencyPriceLoading } = useEtherInput({ value, usdMode });

  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={usdMode ? "Enter amount in USD" : "Enter amount in ETH"}
        />
        <button onClick={() => setUsdMode((m) => !m)}>
          {usdMode ? "USD" : "ETH"}
        </button>
      </div>
      {isNativeCurrencyPriceLoading ? (
        <p>Fetching price...</p>
      ) : (
        <p>
          ETH: <strong>{valueInEth || "–"}</strong> | USD: <strong>{valueInUsd || "–"}</strong>
        </p>
      )}
    </div>
  );
}

export function UseEtherInputErrorHint() {
  const [value, setValue] = useState("1000");
  const [usdMode] = useState(true);
  const { valueInEth, valueInUsd, isNativeCurrencyPriceError } = useEtherInput({ value, usdMode });

  if (isNativeCurrencyPriceError) {
    return <p style={{ color: "red" }}>Price feed unavailable. Showing entered value: ${valueInUsd}</p>;
  }

  return <p>ETH: {valueInEth || "–"} | USD: {valueInUsd || "–"}</p>;
}
