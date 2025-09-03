import { ReactNode, useState } from "react";

interface CollapsibleProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const Collapsible = ({ title, children, className = "" }: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`border-2 border-secondary rounded-lg ${className}`}>
      <button
        type="button"
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between p-3 text-left bg-base-200 hover:brightness-90 transition-colors rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary ${isOpen ? "rounded-b-none" : "rounded-b-md"}`}
      >
        <span className="text-primary-content/50 text-sm">{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {isOpen && <div className="p-4 border-t border-secondary/80">{children}</div>}
    </div>
  );
};
