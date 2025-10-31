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
    <div className={`border-2 border-sui-primary-subtle rounded-2xl ${className}`}>
      <button
        type="button"
        onClick={toggleOpen}
        className={`w-full flex items-center justify-between p-3 text-left bg-sui-primary-neutral hover:brightness-90 transition-colors rounded-t-[14px] focus:outline-none border-sui-primary-subtle focus:ring-2 focus:ring-sui-primary ${isOpen ? "rounded-b-none" : "rounded-b-[14px]"}`}
      >
        <span className="text-sui-primary-content/50 text-sm">{title}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {isOpen && <div className="p-4 border-t border-sui-primary-subtle/80">{children}</div>}
    </div>
  );
};
