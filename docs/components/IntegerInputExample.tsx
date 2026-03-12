"use client";

import React, { useState } from "react";
import { IntegerInput, IntegerVariant } from "@scaffold-ui/debug-contracts";

interface IntegerInputExampleProps {
  initialValue?: string;
  placeholder?: string;
  variant?: IntegerVariant;
  disabled?: boolean;
}

export const IntegerInputExample = ({
  initialValue = "",
  placeholder,
  variant = IntegerVariant.UINT256,
  disabled,
}: IntegerInputExampleProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <IntegerInput
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      variant={variant}
      disabled={disabled}
    />
  );
};
