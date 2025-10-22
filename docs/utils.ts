import {
  mainnet,
  goerli,
  sepolia,
  optimism,
  optimismGoerli,
  optimismSepolia,
  arbitrum,
  arbitrumGoerli,
  arbitrumSepolia,
  polygon,
  polygonMumbai,
  polygonAmoy,
  astar,
  polygonZkEvm,
  polygonZkEvmTestnet,
  base,
  baseGoerli,
  baseSepolia,
  celoAlfajores,
} from "viem/chains";

const ALCHEMY_API_KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

// Mapping of chainId to RPC chain name an format followed by alchemy and infura
export const RPC_CHAIN_NAMES: Record<number, string> = {
  [mainnet.id]: "eth-mainnet",
  [goerli.id]: "eth-goerli",
  [sepolia.id]: "eth-sepolia",
  [optimism.id]: "opt-mainnet",
  [optimismGoerli.id]: "opt-goerli",
  [optimismSepolia.id]: "opt-sepolia",
  [arbitrum.id]: "arb-mainnet",
  [arbitrumGoerli.id]: "arb-goerli",
  [arbitrumSepolia.id]: "arb-sepolia",
  [polygon.id]: "polygon-mainnet",
  [polygonMumbai.id]: "polygon-mumbai",
  [polygonAmoy.id]: "polygon-amoy",
  [astar.id]: "astar-mainnet",
  [polygonZkEvm.id]: "polygonzkevm-mainnet",
  [polygonZkEvmTestnet.id]: "polygonzkevm-testnet",
  [base.id]: "base-mainnet",
  [baseGoerli.id]: "base-goerli",
  [baseSepolia.id]: "base-sepolia",
  [celoAlfajores.id]: "celo-alfajores",
};

export const getAlchemyHttpUrl = (chainId: number) => {
  return ALCHEMY_API_KEY && RPC_CHAIN_NAMES[chainId]
    ? `https://${RPC_CHAIN_NAMES[chainId]}.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
    : undefined;
};
