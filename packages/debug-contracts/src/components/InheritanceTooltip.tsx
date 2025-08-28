import { InformationCircleIcon } from "@heroicons/react/20/solid";

export const InheritanceTooltip = ({ inheritedFrom }: { inheritedFrom?: string }) => (
  <>
    {inheritedFrom && (
      <div className="relative group inline-block px-2">
        <InformationCircleIcon className="h-4 w-4 text-info cursor-help" aria-hidden="true" />
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-neutral text-neutral-content text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          Inherited from: {inheritedFrom}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-neutral"></div>
        </div>
      </div>
    )}
  </>
);
