import { InformationCircleIcon } from "@heroicons/react/20/solid";
import { Tooltip } from "./Tooltip";

export const InheritanceTooltip = ({ inheritedFrom }: { inheritedFrom?: string }) => (
  <>
    {inheritedFrom && (
      <Tooltip content={`Inherited from: ${inheritedFrom}`} position="top" className="px-2">
        <InformationCircleIcon className="h-4 w-4 text-info cursor-help" aria-hidden="true" />
      </Tooltip>
    )}
  </>
);
