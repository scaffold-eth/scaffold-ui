import React, { ReactNode } from "react";

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
  show?: boolean;
  className?: string;
  contentClassName?: string;
};

const getPositionClasses = (position: TooltipPosition): string => {
  switch (position) {
    case "top":
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
    case "bottom":
      return "top-full left-1/2 transform -translate-x-1/2 mt-2";
    case "left":
      return "right-full top-1/2 transform -translate-y-1/2 mr-2";
    case "right":
      return "left-full top-1/2 transform -translate-y-1/2 ml-2";
    default:
      return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
  }
};

const getArrowClasses = (position: TooltipPosition): string => {
  switch (position) {
    case "top":
      return "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-sui-primary";
    case "bottom":
      return "absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-sui-primary";
    case "left":
      return "absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-sui-primary";
    case "right":
      return "absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-sui-primary";
    default:
      return "absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-sui-primary";
  }
};

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  position = "top",
  show = true,
  className = "",
  contentClassName = "",
}) => {
  if (!show || !content) {
    return <>{children}</>;
  }

  const positionClasses = getPositionClasses(position);
  const arrowClasses = getArrowClasses(position);

  return (
    <div className={`relative group inline-block ${className}`}>
      {children}
      <div
        className={`absolute ${positionClasses} px-2 py-1 text-sm rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 bg-sui-primary text-sui-primary-content ${contentClassName}`}
      >
        {content}
        <div className={arrowClasses}></div>
      </div>
    </div>
  );
};
