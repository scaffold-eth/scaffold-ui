"use client";

import React, { useState } from "react";
import { IntegerInput, IntegerVariant } from "@scaffold-ui/debug-contracts";

interface IntegerInputExampleProps {
  initialValue?: string;
  placeholder?: string;
  // Variant name (e.g. "INT64") rather than the enum value itself, so docs
  // pages can pick a variant without importing IntegerVariant — and thus the
  // server-incompatible debug-contracts module — into their MDX server scope.
  variant?: keyof typeof IntegerVariant;
  disableMultiplyBy1e18?: boolean;
  disabled?: boolean;
}

export const IntegerInputExample = ({
  initialValue = "",
  placeholder,
  variant = "UINT256",
  disableMultiplyBy1e18,
  disabled,
}: IntegerInputExampleProps) => {
  const [value, setValue] = useState(initialValue);

  return (
    <IntegerInput
      value={value}
      onChange={setValue}
      placeholder={placeholder}
      variant={IntegerVariant[variant]}
      disableMultiplyBy1e18={disableMultiplyBy1e18}
      disabled={disabled}
    />
  );
};
