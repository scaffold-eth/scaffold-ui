import { useCallback } from "react";
import { parseEther } from "viem";
import { Tooltip } from "../Tooltip";

/**
 * Returns the "base" value by stripping trailing zeros from integers.
 * So clicking ×1e8 then ×1e18 (or vice versa) applies only the last clicked factor.
 * e.g. "1000000000000000000" → "1", "100000000" → "1". Values with decimals are unchanged.
 */
function normalizeToBase(value: string): string {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "0") return trimmed;
  if (trimmed.includes(".")) return trimmed;
  try {
    const big = BigInt(trimmed);
    if (big === 0n) return "0";
    const s = big.toString();
    const withoutTrailing = s.replace(/0+$/, "");
    if (withoutTrailing === s) return s;
    const trailingCount = s.length - withoutTrailing.length;
    return (big / BigInt(10 ** trailingCount)).toString();
  } catch {
    return trimmed;
  }
}

/** Multiplies a decimal string by 1e8 (Hedera 8 decimals) without float precision loss */
function multiplyValueBy1e8(value: string): string {
  const parts = value.trim().split(".");
  const intPart = parts[0] || "0";
  const fracPart = (parts[1] || "").padEnd(8, "0").slice(0, 8);
  const result = BigInt(intPart) * BigInt(10 ** 8) + BigInt(fracPart || "0");
  return result.toString();
}

export type DecimalMultiplierButtonsProps = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export const DecimalMultiplierButtons = ({
  value,
  onChange,
  disabled = false,
}: DecimalMultiplierButtonsProps) => {
  const multiplyBy1e18 = useCallback(() => {
    if (!value) return;
    const base = normalizeToBase(value);
    onChange(parseEther(base).toString());
  }, [onChange, value]);

  const multiplyBy1e8 = useCallback(() => {
    if (!value) return;
    const base = normalizeToBase(value);
    onChange(multiplyValueBy1e8(base));
  }, [onChange, value]);

  const buttonClass = `${disabled ? "cursor-not-allowed" : "cursor-pointer"} font-medium text-xs px-2 py-0.5 rounded text-sui-accent hover:bg-sui-accent/10 h-full transition-colors`;

  return (
    <div className="flex items-center gap-0">
      <Tooltip content="Multiply by 1e8 (tinybars)" position="top">
        <button
          className={buttonClass}
          onClick={multiplyBy1e8}
          disabled={disabled}
          type="button"
        >
          ×1e8
        </button>
      </Tooltip>
      <span className="text-sui-base-content/50 text-xs px-0.5" aria-hidden>
        |
      </span>
      <Tooltip content="Multiply by 1e18 (wei)" position="top">
        <button
          className={buttonClass}
          onClick={multiplyBy1e18}
          disabled={disabled}
          type="button"
        >
          ×1e18
        </button>
      </Tooltip>
    </div>
  );
};
