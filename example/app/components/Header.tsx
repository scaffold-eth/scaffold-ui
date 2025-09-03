"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  const getLinkClassName = (href: string) => {
    const isActive = pathname === href;
    const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";

    if (isActive) {
      return `${baseClasses} bg-[var(--color-sui-primary)] text-[var(--color-sui-primary-content)] font-semibold`;
    }

    return `${baseClasses} text-[var(--color-sui-primary-content)] hover:text-[var(--color-sui-primary)] hover:bg-[var(--color-sui-primary-subtle)]`;
  };

  return (
    <header className="w-full bg-[var(--color-sui-primary-neutral)] border-[var(--color-sui-primary)] border-b-2 shadow-lg">
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
              <Link href="/" className={getLinkClassName("/")}>
                Home
              </Link>
              <Link href="/debug" className={getLinkClassName("/debug")}>
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
