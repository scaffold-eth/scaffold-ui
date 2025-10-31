import React, { CSSProperties, ElementType, ComponentPropsWithoutRef } from "react";

type ComponentWrapperProps<T extends ElementType = "div"> = {
  children: React.ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "style" | "children" | "as">;

/**
 * Base wrapper component for all scaffold-ui components
 * Automatically applies the font-sans class for consistent styling
 */
export const DefaultStylesWrapper = <T extends ElementType = "div">({
  children,
  className = "",
  style,
  as,
  ...props
}: ComponentWrapperProps<T>) => {
  const Component = as || "div";
  return (
    <Component className={`${className} font-sans`} style={style} {...props}>
      {children}
    </Component>
  );
};
