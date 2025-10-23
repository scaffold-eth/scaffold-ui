import { useCallback, useEffect, useState } from "react";
import { parseEther } from "viem";
import { CommonInputProps, IntegerVariant, isValidInteger } from "../../utils/inputs";
import { BaseInput } from "@scaffold-ui/components";
import { Tooltip } from "../Tooltip";

type IntegerInputProps = CommonInputProps<string> & {
  variant?: IntegerVariant;
  disableMultiplyBy1e18?: boolean;
};

export const IntegerInput = ({
  value,
  onChange,
  name,
  placeholder,
  disabled,
  variant = IntegerVariant.UINT256,
  disableMultiplyBy1e18 = false,
}: IntegerInputProps) => {
  const [inputError, setInputError] = useState(false);
  const multiplyBy1e18 = useCallback(() => {
    if (!value) {
      return;
    }
    return onChange(parseEther(value).toString());
  }, [onChange, value]);

  useEffect(() => {
    if (isValidInteger(variant, value)) {
      setInputError(false);
    } else {
      setInputError(true);
    }
  }, [value, variant]);

  return (
    <BaseInput
      name={name}
      value={value}
      placeholder={placeholder}
      error={inputError}
      onChange={onChange}
      disabled={disabled}
      suffix={
        !inputError &&
        !disableMultiplyBy1e18 && (
          <div className="space-x-4 flex items-center">
            <Tooltip content="Multiply by 1e18 (wei)" position="top">
              <button
                className={`${disabled ? "cursor-not-allowed" : "cursor-pointer"} font-semibold px-4 text-sui-accent h-full`}
                onClick={multiplyBy1e18}
                disabled={disabled}
                type="button"
              >
                ∗
              </button>
            </Tooltip>
          </div>
        )
      }
    />
  );
};
