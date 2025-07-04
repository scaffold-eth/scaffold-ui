import { ConnectButton } from "@rainbow-me/rainbowkit";
import { UseAddressExample } from "./components/UseAddressExample";
import { UseBalanceExample } from "./components/UseBalanceExample";
import { UseAddressInputExample } from "./components/UseAddressInputExample";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-transparent to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-8">
          <ConnectButton />
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-12">Scaffold UI Example</h1>
          <UseAddressExample />
          <div className="my-12 border-t border-gray-700 w-full max-w-2xl" />
          <UseBalanceExample />

          <div className="my-12 border-t border-gray-700 w-full max-w-2xl" />
          <UseAddressInputExample />

          <footer className="mt-16 text-center text-sm text-gray-400">
            <a
              href="https://buidlguidl.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition-colors"
            >
              Built with ❤️ by Buidlguidl
            </a>
          </footer>
        </div>
      </div>
    </main>
  );
}
