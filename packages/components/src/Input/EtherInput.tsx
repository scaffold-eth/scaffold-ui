import { useEffect, useRef, useState } from "react";
import { MAX_DECIMALS_USD, useEtherInput } from "@scaffold-ui/hooks";
import { SwitchIcon } from "../icons/SwitchIcon";
import { DEFAULT_COLORS, InputBase } from "./InputBase";
import { CommonInputProps } from "./utils";

export type EtherInputProps = Omit<CommonInputProps<string>, "onChange" | "value"> & {
  defaultValue?: string;
  defaultUsdMode?: boolean;
  onValueChange?: (value: { valueInEth: string; valueInUsd: string; displayUsdMode: boolean }) => void;
};

const SIGNED_NUMBER_REGEX = /^-?\d+\.?\d*$/;

/**
 * EtherInput Component
 *
 * An input component for entering ETH/USD values, with support for toggling between the two.
 * - Allows users to input a value in either ETH or USD.
 * - Provides a toggle button to switch between ETH and USD input modes.
 * - Automatically converts the value between ETH and USD based on the current price.
 * - Notifies parent components of value changes in both ETH and USD.
 *
 * @param {EtherInputProps} props - The props for the EtherInput component.
 * @param {string} [props.name] - (Optional) The name attribute for the input element.
 * @param {string} [props.placeholder] - (Optional) Placeholder text for the input.
 * @param {string} [props.defaultValue] - (Optional) Default value for the input.
 * @param {boolean} [props.defaultUsdMode] - (Optional) If true, input starts in USD mode; otherwise, ETH mode.
 * @param {boolean} [props.disabled] - (Optional) If true, the input and toggle button are disabled.
 * @param {(value: { valueInEth: string; valueInUsd: string; usdMode: boolean }) => void} props.onValueChange - (Optional) Callback fired when the value or mode changes.
 * @param {string} [props.colors] - (Optional) Colors for the input.
 * @param {string} [props.colors.border] - Border color.
 * @param {string} [props.colors.background] - Background color.
 * @param {string} [props.colors.text] - Text color.
 *
 * @example
 * <EtherInput onValueChange={({ valueInEth, valueInUsd, usdMode }) => { ... }} />
 * <EtherInput defaultUsdMode placeholder="Amount" onValueChange={...} />
 */
export const EtherInput = ({
  name,
  placeholder,
  defaultValue,
  defaultUsdMode,
  disabled,
  onValueChange,
  colors = DEFAULT_COLORS,
}: EtherInputProps) => {
  const [sourceValue, setSourceValue] = useState(defaultValue ?? "");
  const [sourceUsdMode, setSourceUsdMode] = useState(defaultUsdMode ?? false);
  const [displayUsdMode, setDisplayUsdMode] = useState(defaultUsdMode ?? false);

  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const { valueInEth, valueInUsd, isNativeCurrencyPriceLoading, isNativeCurrencyPriceError } = useEtherInput({
    value: sourceValue,
    usdMode: sourceUsdMode,
  });

  const activeValue = displayUsdMode ? valueInUsd : valueInEth;

  useEffect(() => {
    if (onValueChangeRef.current) {
      onValueChangeRef.current({ valueInEth, valueInUsd, displayUsdMode });
    }
  }, [valueInEth, valueInUsd, displayUsdMode]);

  const handleInputChange = (value: string) => {
    if (value && !SIGNED_NUMBER_REGEX.test(value)) {
      return;
    }

    if (displayUsdMode) {
      const decimals = value.split(".")[1];
      if (decimals && decimals.length > MAX_DECIMALS_USD) {
        return;
      }
    }

    setSourceValue(value);
    if (sourceUsdMode !== displayUsdMode) {
      setSourceUsdMode(displayUsdMode);
    }
  };

  const handleToggleMode = () => {
    setDisplayUsdMode((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-2">
      <InputBase<string>
        name={name}
        value={activeValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        disabled={isNativeCurrencyPriceLoading || disabled}
        prefix={<span className="pl-4 -mr-2 text-accent self-center">{displayUsdMode ? "$" : "Ξ"}</span>}
        colors={colors}
        suffix={
          <button
            className="h-[2.2rem] min-h-[2.2rem] cursor-pointer mr-3"
            onClick={(e) => {
              e.preventDefault();
              handleToggleMode();
            }}
            disabled={isNativeCurrencyPriceLoading || isNativeCurrencyPriceError || disabled}
            type="button"
            tabIndex={-1}
            title={
              isNativeCurrencyPriceLoading
                ? "Fetching price"
                : isNativeCurrencyPriceError
                  ? "Unable to fetch price"
                  : "Toggle USD/ETH"
            }
          >
            <SwitchIcon width={16} height={16} />
          </button>
        }
      />
    </div>
  );
};
