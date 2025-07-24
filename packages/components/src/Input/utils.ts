export type CommonInputProps<T = string> = {
  value: T;
  onChange: (newValue: T) => void;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  colors?: {
    border: string;
    background: string;
    text: string;
  };
};
