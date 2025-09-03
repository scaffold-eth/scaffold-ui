"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="w-full bg-[var(--color-sui-primary-neutral)] border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Branding */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-[var(--color-sui-primary-content)]">Scaffold UI</h1>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-[var(--color-sui-primary-content)] hover:text-[var(--color-sui-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/debug"
                className="text-[var(--color-sui-primary-content)] hover:text-[var(--color-sui-primary)] px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Debug Contracts
              </Link>
            </div>
          </nav>

          {/* Connect Button */}
          <div className="flex items-center">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};
