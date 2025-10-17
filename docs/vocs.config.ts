import { defineConfig } from "vocs";

export default defineConfig({
  rootDir: ".",
  title: "Scaffold UI",
  description: "React components and hooks for Ethereum dApps",
  sidebar: {
    "/": [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/getting-started/installation" },
        ],
      },
    ],
    "/getting-started": [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/getting-started/installation" },
        ],
      },
    ],
    // Components-specific sidebar
    "/components": [
      {
        text: "Components",
        items: [
          { text: "Overview", link: "/components" },
          { text: "Address", link: "/components/address" },
          { text: "Balance", link: "/components/balance" },
        ],
      },
    ],
    "/hooks": [
      {
        text: "Hooks",
        items: [
          { text: "Overview", link: "/hooks" },
          { text: "useAddress", link: "/hooks/useAddress" },
        ],
      },
    ],
  },
  topNav: [
    { text: "Components", link: "/components" },
    { text: "Hooks", link: "/hooks" },
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
