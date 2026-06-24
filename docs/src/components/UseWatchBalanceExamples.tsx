"use client";
import React from "react";
import { useWatchBalance } from "@scaffold-ui/hooks";
import { mainnet } from "viem/chains";
import { formatEther } from "viem";

export function UseWatchBalanceBasicExample() {
  const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const { data, isLoading, isError } = useWatchBalance({ address, chain: mainnet });

  if (isLoading) return <p>Fetching balance…</p>;
  if (isError || !data) return <p style={{ color: "red" }}>Could not fetch balance</p>;

  return (
    <p>
      Balance: {Number(formatEther(data.value)).toLocaleString()} {data.symbol}
    </p>
  );
}
