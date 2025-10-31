"use client";

import React, { useState } from "react";
import { AddressInput } from "@scaffold-ui/components";
import type { CSSProperties } from "react";

interface AddressInputExampleProps {
  initialValue?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
}

export const AddressInputExample = ({
  initialValue = "",
  placeholder,
  disabled,
  style,
}: AddressInputExampleProps) => {
  const [address, setAddress] = useState(initialValue);

  return (
    <AddressInput
      value={address}
      onChange={setAddress}
      placeholder={placeholder}
      disabled={disabled}
      style={style}
    />
  );
};
