import { defineConfig, McpSource } from "vocs/config";

const baseUrl =
  process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://ui.scaffoldeth.io";

export default defineConfig({
  title: "Scaffold UI",
  description: "React components and hooks for Ethereum dApps",
  baseUrl,
  // v2's Shiki bundle is strict: an unknown fence language hard-fails the build
  // (v1 silently fell back to plaintext). Everything here uses standard langs,
  // but keep the net so a future typo'd fence degrades to text instead.
  codeHighlight: {
    fallbackLanguage: "text",
  },
  // Native v2 MCP server at /api/mcp. scaffold-ui ships as installed packages,
  // so the GitHub repo matches what users have in node_modules — exposing it as
  // a source is safe (unlike a scaffolded full-stack template, which diverges
  // from the user's project the moment they customize it).
  mcp: {
    enabled: true,
    sources: [
      McpSource.github({ name: "scaffold-ui", repo: "scaffold-eth/scaffold-ui" }),
    ],
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
        { text: "useWatchBalance", link: "/hooks/useWatchBalance" },
        { text: "useFetchNativeCurrencyPrice", link: "/hooks/useFetchNativeCurrencyPrice" },
        { text: "useEtherInput", link: "/hooks/useEtherInput" },
      ],
    },
    {
      text: "Debug Contracts",
      items: [
        { text: "Contract", link: "/debug-contracts/Contract" },
        { text: "IntegerInput", link: "/debug-contracts/IntegerInput" },
      ],
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
