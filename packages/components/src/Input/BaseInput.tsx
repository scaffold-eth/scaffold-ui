"use client";

import { ChangeEvent, FocusEvent, ReactNode, useCallback, useEffect, useRef } from "react";
import { CommonInputProps } from "./utils";
import { ComponentWrapper } from "../utils/ComponentWrapper";

export type BaseInputProps<T> = CommonInputProps<T> & {
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  reFocus?: boolean;
};

/**
 * BaseInput Component
 *
 * A flexible, styled input component used as the foundation for custom inputs (e.g., EtherInput, AddressInput).
 * - Supports prefix and suffix elements for icons or adornments.
 * - Handles error and disabled states with visual feedback.
 * - Can auto-focus and set cursor position at the end when `reFocus` is true (useful for programmatic focus).
 * - Accepts custom color classes for border, background, and text.
 *
 * @template T - The value type, must have a toString method (e.g., string, Address).
 * @param {BaseInputProps<T>} props - The props for the BaseInput component.
 * @param {string} [props.name] - (Optional) The name attribute for the input element.
 * @param {T} [props.value] - The value of the input.
 * @param {(value: T) => void} props.onChange - Callback fired when the input value changes.
 * @param {string} [props.placeholder] - (Optional) Placeholder text for the input.
 * @param {boolean} [props.error] - (Optional) If true, input is styled as error.
 * @param {boolean} [props.disabled] - (Optional) If true, the input is disabled.
 * @param {ReactNode} [props.prefix] - (Optional) Element to render before the input (e.g., icon).
 * @param {ReactNode} [props.suffix] - (Optional) Element to render after the input (e.g., button).
 * @param {boolean} [props.reFocus] - (Optional) If true, input auto-focuses and cursor moves to end.
 * @param {CSSProperties} [props.style] - (Optional) Styles for the input.
 *
 * @example
 * <BaseInput
 *   name="username"
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Enter your name"
 *   prefix={<UserIcon />}
 *   error={hasError}
 * />
 */
export const BaseInput = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  reFocus,
  style,
}: BaseInputProps<T>) => {
  const inputReft = useRef<HTMLInputElement>(null);

  let modifier = "";
  if (error) {
    modifier = "border-sui-input-border-error!";
  } else if (disabled) {
    modifier = "border-sui-input-border-disabled!";
  }

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange],
  );

  // Runs only when reFocus prop is passed, useful for setting the cursor
  // at the end of the input. Example AddressInput
  const onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (reFocus !== undefined) {
      e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
    }
  };
  useEffect(() => {
    if (reFocus) inputReft.current?.focus({ preventScroll: true });
  }, [reFocus]);

  return (
    <ComponentWrapper
      className={`flex border-2 rounded-full border-sui-input-border bg-sui-input-background text-sui-input-text ${modifier}`}
      style={style}
    >
      {prefix}
      <input
        className={`w-full h-[2.2rem] min-h-[2.2rem] px-4 border-0 bg-transparent font-medium placeholder:text-sui-accent/70 focus:text-sui-input-text text-sui-input-text disabled:text-sui-base-content/40 text-sm focus:outline-none focus:ring-0 ${
          disabled ? "cursor-not-allowed" : ""
        }`}
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        ref={inputReft}
        onFocus={onFocus}
      />
      {suffix}
    </ComponentWrapper>
  );
};
