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
      items: [
        { text: "Introduction", link: "/" },
        { text: "Installation", link: "/getting-started/installation" },
      ],
    },
    {
      text: "Components",
      items: [
        { text: "Address", link: "/components/Address" },
        { text: "Balance", link: "/components/Balance" },
        { text: "AddressInput", link: "/components/AddressInput" },
        { text: "EtherInput", link: "/components/EtherInput" },
      ],
    },
    {
      text: "Hooks",
      items: [
        { text: "useAddress", link: "/hooks/useAddress" },
        { text: "useAddressInput", link: "/hooks/useAddressInput" },
      ],
    },
  ],
  topNav: [
    { text: "Components", link: "/components/Address" },
    { text: "Hooks", link: "/hooks/useAddress" },
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
