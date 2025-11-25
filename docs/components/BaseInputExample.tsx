"use client";

import React, { useState, ReactNode } from "react";
import { BaseInput } from "@scaffold-ui/components";

interface BaseInputExampleProps {
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  validateEmail?: boolean;
}

export const BaseInputExample = ({
  initialValue = "",
  placeholder,
  disabled,
  error,
  prefix,
  suffix,
  validateEmail,
}: BaseInputExampleProps) => {
  const [value, setValue] = useState(initialValue);

  const hasError = validateEmail ? value.length > 0 && !value.includes("@") : error;

  return (
    <div>
      <BaseInput
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        disabled={disabled}
        error={hasError}
        prefix={prefix}
        suffix={suffix}
      />
      {validateEmail && hasError && (
        <p style={{ color: "red", fontSize: 12, marginTop: 4 }}>Please enter a valid email</p>
      )}
    </div>
  );
};
