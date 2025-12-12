import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { createConfig } from "wagmi";
import { base, mainnet, polygon, sepolia } from "viem/chains";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { createClient, http } from "viem";
import { rainbowkitBurnerWallet } from "burner-connector";

const wallets = [metaMaskWallet, rainbowkitBurnerWallet];
const walletConnectProjectID = "3a8170812b534d0ff9d794f19a901d64";
const wagmiConnectors = connectorsForWallets(
  [
    {
      groupName: "Supported Wallets",
      wallets,
    },
  ],

  {
    appName: "scaffold-eth-2",
    projectId: walletConnectProjectID,
  },
);

export const chains = [base, mainnet, sepolia, polygon] as const;

export const wagmiConfig = createConfig({
  chains: chains,
  connectors: wagmiConnectors,
  ssr: true,
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});
