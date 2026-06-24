"use client";

import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, polygon, sepolia } from "viem/chains";
import { createConfig, http } from "wagmi";
import { createClient } from "viem";
import "@scaffold-ui/components/styles.css";
import "@scaffold-ui/debug-contracts/styles.css";
import { getAlchemyHttpUrl } from "../utils";

export const chains = [mainnet, polygon, sepolia] as const;

const wagmiConfig = createConfig({
  chains: chains,
  connectors: [],
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
    });
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

// Vocs marks its color mode with data-vocs-theme on <html>, but the scaffold-ui
// components scope their dark variant to :root carrying .dark / [data-theme=dark] —
// a wrapper element won't trigger it, it has to be on <html> itself. So mirror Vocs's
// value onto data-theme on <html>, and keep it in sync as the docs theme toggles.
// Module-level guard so many DocsProvider instances install just one observer.
let themeSyncStarted = false;
function startThemeSync() {
  if (themeSyncStarted || typeof document === "undefined") return;
  themeSyncStarted = true;

  const html = document.documentElement;
  const sync = () =>
    html.setAttribute(
      "data-theme",
      html.getAttribute("data-vocs-theme") === "dark" ? "dark" : "light",
    );

  sync();
  new MutationObserver(sync).observe(html, {
    attributes: true,
    attributeFilter: ["data-vocs-theme"],
  });
}

export function DocsProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    startThemeSync();
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
