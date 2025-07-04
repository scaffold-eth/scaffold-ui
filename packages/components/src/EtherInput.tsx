import { useEffect, useState } from "react";
import { useEtherInput } from "@scaffold-ui/hooks";

export type EtherInputProps = {
  name?: string;
  placeholder?: string;
  defaultUsdMode?: boolean;
  onValueChange: (value: { valueInEth: string; valueInUsd: string; usdMode: boolean }) => void;
};

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
 * @param {boolean} [props.defaultUsdMode] - (Optional) If true, input starts in USD mode; otherwise, ETH mode.
 * @param {(value: { valueInEth: string; valueInUsd: string; usdMode: boolean }) => void} props.onValueChange - Callback fired when the value or mode changes.
 *
 * @example
 * <EtherInput onValueChange={({ valueInEth, valueInUsd, usdMode }) => { ... }} />
 * <EtherInput defaultUsdMode placeholder="Amount" onValueChange={...} />
 */
export const EtherInput = ({ name, placeholder, defaultUsdMode, onValueChange }: EtherInputProps) => {
  const [value, setValue] = useState("");
  const [usdMode, setUsdMode] = useState(defaultUsdMode ?? false);

  const { activeValue, valueInEth, valueInUsd, isNativeCurrencyPriceLoading, isNativeCurrencyPriceError } =
    useEtherInput({ value, usdMode });

  useEffect(() => {
    if (onValueChange) {
      onValueChange({ valueInEth, valueInUsd, usdMode });
    }
  }, [valueInEth, valueInUsd, usdMode, onValueChange]);

  // Handle mode toggle and convert value to the new mode
  const handleToggleMode = () => {
    if (usdMode) {
      // Switching from USD to ETH: set value to valueInEth
      setValue(valueInEth);
      setUsdMode(false);
    } else {
      // Switching from ETH to USD: set value to valueInUsd
      setValue(valueInUsd);
      setUsdMode(true);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="pl-4 -mr-2 text-accent self-center">{usdMode ? "$" : "Ξ"}</span>
      <input
        name={name}
        value={activeValue}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        disabled={isNativeCurrencyPriceLoading}
        className="input input-bordered w-40"
        autoComplete="off"
      />
      <button
        className="btn btn-primary h-[2.2rem] min-h-[2.2rem]"
        onClick={(e) => {
          e.preventDefault();
          handleToggleMode();
        }}
        disabled={isNativeCurrencyPriceLoading || isNativeCurrencyPriceError}
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
        🔀
      </button>
    </div>
  );
};
