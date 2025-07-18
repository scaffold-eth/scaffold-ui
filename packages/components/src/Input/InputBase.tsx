import { ChangeEvent, FocusEvent, ReactNode, useCallback, useEffect, useRef } from "react";
import { CommonInputProps } from "./utils";

export type InputBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  reFocus?: boolean;
};

export const InputBase = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  reFocus,
}: InputBaseProps<T>) => {
  const inputReft = useRef<HTMLInputElement>(null);

  let modifier = "";
  if (error) {
    modifier = "border-red-400";
  } else if (disabled) {
    modifier = "border-gray-300 bg-base-300";
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
    if (reFocus) inputReft.current?.focus();
  }, [reFocus]);

  return (
    <div className={`flex border-2 border-[#dae8ff] bg-[#f4f8ff] rounded-full text-[#93bbfb] ${modifier}`}>
      {prefix}
      <input
        className={`w-full h-[2.2rem] min-h-[2.2rem] px-4 border-0 bg-transparent font-medium placeholder:text-[#93bbfb]/70 text-[#93bbfb]/70 focus:text-[#93bbfb]/70 focus:outline-none focus:ring-0 ${
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
    </div>
  );
};
