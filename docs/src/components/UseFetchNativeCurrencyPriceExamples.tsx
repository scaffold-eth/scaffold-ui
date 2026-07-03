"use client";
import React from "react";
import { useFetchNativeCurrencyPrice } from "@scaffold-ui/hooks";
import { mainnet, polygon } from "viem/chains";

export function UseFetchNativeCurrencyPriceBasicExample() {
  const { price, isLoading, isError } = useFetchNativeCurrencyPrice(mainnet);

  if (isLoading) return <p>Fetching ETH price…</p>;
  if (isError) return <p style={{ color: "red" }}>Could not fetch ETH price</p>;

  return <p>1 ETH ≈ ${price.toLocaleString()}</p>;
}

export function UseFetchNativeCurrencyPriceConvertExample() {
  const amount = 1.25;
  const { price, isLoading } = useFetchNativeCurrencyPrice(mainnet);

  if (isLoading) return <p>Loading…</p>;

  return (
    <p>
      {amount} ETH ≈ ${(amount * price).toLocaleString()}
    </p>
  );
}

export function UseFetchNativeCurrencyPricePolygonExample() {
  const { price, isLoading, isError } = useFetchNativeCurrencyPrice(polygon);

  if (isLoading) return <p>Fetching POL price…</p>;
  if (isError) return <p style={{ color: "red" }}>Could not fetch POL price</p>;

  return <p>1 POL ≈ ${price.toLocaleString()}</p>;
}
