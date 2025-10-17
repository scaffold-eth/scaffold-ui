import { defineConfig } from "vocs";

export default defineConfig({
  rootDir: ".",
  title: "Scaffold UI",
  description: "React components and hooks for Ethereum dApps",
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
        { text: "Address Input", link: "/components/AddressInput" },
      ],
    },
  ],
  topNav: [
    { text: "Components", link: "/components/Address" },
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
