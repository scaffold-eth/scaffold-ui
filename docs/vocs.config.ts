import { defineConfig } from "vocs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  rootDir: ".",
  title: "Scaffold UI",
  description: "React components and hooks for Ethereum dApps",
  vite: {
    envDir: __dirname,
    envPrefix: "VITE_",
  },
  sidebar: [
    {
      text: "Getting Started",
      items: [{ text: "Introduction", link: "/" }],
    },
    {
      text: "Components",
      items: [
        { text: "Installation", link: "/components" },
        { text: "Address", link: "/components/Address" },
        { text: "Balance", link: "/components/Balance" },
        { text: "AddressInput", link: "/components/AddressInput" },
        { text: "EtherInput", link: "/components/EtherInput" },
        { text: "BaseInput", link: "/components/BaseInput" },
        { text: "Styling", link: "/components/Styling" },
        { text: "Theming", link: "/components/Theming" },
      ],
    },
    {
      text: "Hooks",
      items: [
        { text: "Installation", link: "/hooks" },
        { text: "useAddress", link: "/hooks/useAddress" },
        { text: "useAddressInput", link: "/hooks/useAddressInput" },
        { text: "useBalance", link: "/hooks/useBalance" },
        { text: "useEtherInput", link: "/hooks/useEtherInput" },
      ],
    },
    {
      text: "Debug Contracts",
      items: [{ text: "Contract", link: "/debug-contracts/Contract" }],
    },
  ],
  topNav: [
    { text: "Components", link: "/components/Address" },
    { text: "Hooks", link: "/hooks/useAddress" },
    { text: "Debug Contracts", link: "/debug-contracts/Contract" },
    {
      text: "Examples",
      link: "https://github.com/scaffold-eth/scaffold-ui/tree/main/example",
    },
    { text: "GitHub", link: "https://github.com/scaffold-eth/scaffold-ui" },
  ],
  theme: {
    accentColor: "#007ACC",
  },
});
