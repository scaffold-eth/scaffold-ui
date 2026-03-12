import { useEffect, useState } from "react";
import { CommonInputProps, IntegerVariant, isValidInteger } from "../../utils/inputs";
import { BaseInput } from "@scaffold-ui/components";
import { DecimalMultiplierButtons } from "./DecimalMultiplierButtons";

type IntegerInputProps = CommonInputProps<string> & {
  variant?: IntegerVariant;
};

export const IntegerInput = ({
  value,
  onChange,
  name,
  placeholder,
  disabled,
  variant = IntegerVariant.UINT256,
}: IntegerInputProps) => {
  const [inputError, setInputError] = useState(false);

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
        !inputError && (
          <DecimalMultiplierButtons value={value} onChange={onChange} disabled={disabled} />
        )
      }
    />
  );
};
