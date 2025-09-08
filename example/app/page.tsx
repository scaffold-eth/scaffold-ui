import { UseAddressExample } from "./components/UseAddressExample";
import { UseBalanceExample } from "./components/UseBalanceExample";
import { UseAddressInputExample } from "./components/UseAddressInputExample";
import { UseEtherInputExample } from "./components/UseEtherInputExample";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-[var(--color-sui-primary-content)]">
        <h1 className="text-4xl font-bold mb-8">Scaffold UI Example</h1>

        <UseAddressExample />
        <div className="my-12 border-t border-gray-700 w-full max-w-2xl" />
        <UseBalanceExample />
        <div className="my-12 border-t border-gray-700 w-full max-w-2xl" />
        <UseEtherInputExample />

        <div className="my-12 border-t border-gray-700 w-full max-w-2xl" />
        <UseAddressInputExample />
      </div>
    </div>
  );
}
