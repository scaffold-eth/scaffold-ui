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
      items: [{ text: "Address", link: "/components/address" }],
    },
  ],
  topNav: [
    { text: "Components", link: "/components/address" },
    { text: "Hooks", link: "/hooks/use-address" },
    { text: "Examples", link: "/examples" },
    { text: "GitHub", link: "https://github.com/scaffold-eth/scaffold-ui" },
  ],
  theme: {
    accentColor: "#007ACC",
  },
});
