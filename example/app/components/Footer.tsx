"use client";

export const Footer = () => {
  return (
    <footer className="w-full bg-[var(--color-sui-primary-neutral)] border-t border-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--color-sui-primary-content)] mb-2">Scaffold UI</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                A comprehensive UI library for Ethereum dApps with React components, hooks, and utilities.
              </p>
            </div>

            <div className="flex justify-center space-x-6 mb-6">
              <a
                href="https://github.com/BuidlGuidl/scaffold-ui"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--color-sui-primary)] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://docs.scaffoldeth.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--color-sui-primary)] transition-colors"
              >
                Documentation
              </a>
              <a
                href="https://buidlguidl.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[var(--color-sui-primary)] transition-colors"
              >
                BuidlGuidl
              </a>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <p className="text-sm text-gray-400">
                Built with ❤️ by{" "}
                <a
                  href="https://buidlguidl.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[var(--color-sui-primary)] transition-colors"
                >
                  Buidlguidl
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
