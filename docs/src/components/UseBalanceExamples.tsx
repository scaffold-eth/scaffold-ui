"use client";
import React, { useState } from "react";
import { useBalance } from "@scaffold-ui/hooks";
import { mainnet } from "viem/chains";

export function UseBalanceBasicExample() {
  const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const {
    formattedBalance,
    balanceInUsd,
    displayUsdMode,
    toggleDisplayUsdMode,
    isLoading,
  } = useBalance({
    address,
    chain: mainnet,
  });

  return (
    <div>
      <p>
        Balance: {displayUsdMode ? `$${balanceInUsd.toLocaleString()}` : `${formattedBalance.toLocaleString()} ETH`}
      </p>
      <button onClick={toggleDisplayUsdMode} disabled={isLoading}>
        Toggle USD / ETH
      </button>
    </div>
  );
}

export function UseBalanceLoadingErrorExample() {
  const [isValidAddress, setIsValidAddress] = useState(true);
  const validAddress = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const brokenAddress = "0x";
  const {
    formattedBalance,
    balanceInUsd,
    displayUsdMode,
    toggleDisplayUsdMode,
    isLoading,
    isError,
  } = useBalance({
    address: isValidAddress ? validAddress : brokenAddress,
    chain: mainnet,
    defaultUsdMode: true,
  });

  if (isLoading) return <p>Fetching balance…</p>;
  if (isError) return (
    <div>
        <p style={{ color: "red" }}>Could not fetch balance</p>
        <button
            style={{ display: "block", padding: "8px", background: "#dae8ff", borderRadius: "4px", marginTop: "4px", border: "none", cursor: "pointer", color: "#000" }}
            onClick={() => setIsValidAddress((v) => !v)}
        >
            Fetch balance of the valid address
        </button>
    </div>
  );

  return (
    <div>
      <p>Balance: {displayUsdMode ? `$${balanceInUsd.toLocaleString()}` : `${formattedBalance.toLocaleString()} ETH`}</p>
      <button onClick={toggleDisplayUsdMode}>Toggle USD / ETH</button>

      <button
        style={{ display: "block", padding: "8px", background: "#dae8ff", borderRadius: "4px", marginTop: "4px", border: "none", cursor: "pointer", color: "#000" }}
        onClick={() => setIsValidAddress((v) => !v)}
      >
        Try to fetch balance of the broken address
      </button>
    </div>
  );
}
