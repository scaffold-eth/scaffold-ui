import { blo } from "blo";
import { Address } from "viem";
import { useAddressInput } from "@scaffold-ui/hooks";
import { InputBase } from "./InputBase";
import { CommonInputProps } from "./utils";
import { useEffect, useState } from "react";

export type AddressInputProps = CommonInputProps<Address | string>;

/**
 * AddressInput Component
 *
 * An enhanced input component for Ethereum addresses with ENS name resolution and avatar display.
 * - Accepts both Ethereum addresses and ENS names as input.
 * - Automatically resolves ENS names to addresses and vice versa.
 * - Displays ENS avatars when available.
 * - Shows loading states during resolution.
 * - Displays a blo avatar for resolved addresses.
 * - Handles error states gracefully.
 *
 * @param {AddressInputProps} props - The props for the AddressInput component.
 * @param {Address | string} [props.value] - The input value (can be an address or ENS name).
 * @param {string} [props.name] - The name attribute for the input field.
 * @param {string} [props.placeholder] - (Optional) Placeholder text for the input field.
 * @param {(value: Address) => void} [props.onChange] - Callback function called when the input value changes.
 * @param {boolean} [props.disabled] - (Optional) Whether the input is disabled.
 *
 * @example
 * <AddressInput
 *   value="vitalik.eth"
 *   onChange={(address) => console.log(address)}
 *   placeholder="Enter address or ENS name"
 * />
 *
 * <AddressInput
 *   value="0x123..."
 *   name="recipient"
 *   disabled={false}
 * />
 */
export const AddressInput = ({ value, name, placeholder, onChange, disabled }: AddressInputProps) => {
  const {
    ensAddress,
    ensName,
    ensAvatar,
    isEnsAddressLoading,
    isEnsNameLoading,
    isEnsAvatarLoading,
    isEnsAddressError,
    isEnsNameError,
    isEnsNameSuccess,
    isEnsAddressSuccess,
    settledValue,
  } = useAddressInput({
    value,
  });

  const [enteredEnsName, setEnteredEnsName] = useState<string>();

  const reFocus =
    isEnsAddressError ||
    isEnsNameError ||
    isEnsNameSuccess ||
    isEnsAddressSuccess ||
    ensName === null ||
    ensAddress === null;

  // ens => address
  useEffect(() => {
    if (!ensAddress) return;

    // ENS resolved successfully
    setEnteredEnsName(settledValue);
    onChange(ensAddress);
  }, [ensAddress, onChange, settledValue]);

  useEffect(() => {
    setEnteredEnsName(undefined);
  }, [value]);

  return (
    <InputBase<Address>
      name={name}
      placeholder={placeholder}
      error={ensAddress === null}
      value={value as Address}
      onChange={onChange}
      disabled={isEnsAddressLoading || isEnsNameLoading || disabled}
      reFocus={reFocus}
      prefix={
        ensName ? (
          <div className="flex bg-[#dae8ff] rounded-l-full items-center">
            {isEnsAvatarLoading && (
              <div className="animate-pulse bg-[#f4f8ff] w-[35px] h-[35px] rounded-full shrink-0"></div>
            )}
            {ensAvatar ? (
              <span className="w-[35px]">
                <img className="w-full rounded-full" src={ensAvatar} alt={`${ensAddress} avatar`} />
              </span>
            ) : null}
            <span className="text-[#93bbfb] px-2">{enteredEnsName ?? ensName}</span>
          </div>
        ) : (
          (isEnsNameLoading || isEnsAddressLoading) && (
            <div className="flex bg-[#dae8ff] rounded-l-full items-center gap-2 pr-2">
              <div className="animate-pulse bg-[#f4f8ff] w-[35px] h-[35px] rounded-full shrink-0"></div>
              <div className="animate-pulse bg-[#f4f8ff] h-3 w-20"></div>
            </div>
          )
        )
      }
      suffix={
        // Don't want to use nextJS Image here (and adding remote patterns for the URL)
        value && <img alt="" className="rounded-full!" src={blo(value as `0x${string}`)} width="35" height="35" />
      }
    />
  );
};
