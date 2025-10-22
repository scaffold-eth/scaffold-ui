import { useCallback } from "react";
import { bytesToString, isHex, toBytes, toHex } from "viem";
import { CommonInputProps } from "../../utils/inputs";
import { BaseInput } from "@scaffold-ui/components";

export const BytesInput = ({ value, onChange, name, placeholder, disabled }: CommonInputProps) => {
  const convertStringToBytes = useCallback(() => {
    onChange(isHex(value) ? bytesToString(toBytes(value)) : toHex(toBytes(value)));
  }, [onChange, value]);

  return (
    <BaseInput
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      suffix={
        <button
          className="self-center cursor-pointer font-semibold px-4 text-sui-primary"
          onClick={convertStringToBytes}
          type="button"
        >
          #
        </button>
      }
    />
  );
};
