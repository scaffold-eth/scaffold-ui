import { polygon } from "viem/chains";

export type ChainAttributes = {
  nativeCurrencyTokenAddress: string;
};

export const NETWORKS_EXTRA_DATA: Record<string, ChainAttributes> = {
  [polygon.id]: {
    nativeCurrencyTokenAddress: "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0",
  },
};
