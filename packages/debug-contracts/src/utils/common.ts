import {
  hardhat,
  polygon,
  polygonMumbai,
  optimismSepolia,
  optimism,
  arbitrum,
  fantom,
  arbitrumSepolia,
  fantomTestnet,
  scrollSepolia,
  celo,
  celoAlfajores,
  sepolia,
} from "viem/chains";

export type ChainWithColors = Record<
  string,
  {
    color: string;
  }
>;

export const NETWORKS_EXTRA_DATA: ChainWithColors = {
  [hardhat.id]: {
    color: "#b8af0c",
  },
  [sepolia.id]: {
    color: "#87ff65",
  },
  [polygon.id]: {
    color: "#2bbdf7",
  },
  [polygonMumbai.id]: {
    color: "#92D9FA",
  },
  [optimismSepolia.id]: {
    color: "#f01a37",
  },
  [optimism.id]: {
    color: "#f01a37",
  },
  [arbitrumSepolia.id]: {
    color: "#28a0f0",
  },
  [arbitrum.id]: {
    color: "#28a0f0",
  },
  [fantom.id]: {
    color: "#1969ff",
  },
  [fantomTestnet.id]: {
    color: "#1969ff",
  },
  [scrollSepolia.id]: {
    color: "#fbebd4",
  },
  [celo.id]: {
    color: "#FCFF52",
  },
  [celoAlfajores.id]: {
    color: "#476520",
  },
};
