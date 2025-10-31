import { CSSProperties } from "react";

export type CommonInputProps<T = string> = {
  value: T;
  onChange: (newValue: T) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: CSSProperties;
};
