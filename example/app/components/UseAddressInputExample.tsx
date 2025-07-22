"use client";

import { AddressInput, InputBase } from "@scaffold-ui/components";
import { useAddressInput } from "@scaffold-ui/hooks";
import { useState } from "react";
import { Address } from "viem";

export const UseAddressInputExample = () => {
  const [value, setValue] = useState<string>("");

  const [manualImplementationValue, setManualImplementationValue] = useState<string>("");
  const { ensAddress, ensName, ensAvatar, isEnsAddressLoading, isEnsNameLoading, isEnsAvatarLoading } = useAddressInput(
    {
      value: manualImplementationValue,
    },
  );

  return (
    <div className="mt-8 p-6 max-w-2xl rounded-lg bg-white/5 shadow-xl  w-full">
      <h1 className="text-2xl font-bold mb-6">useAddressInput Hook & AddressInput Component Examples</h1>

      <div className="space-y-8">
        {/* AddressInput Component Examples */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200">AddressInput Component Examples</h2>

          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Default</span>
              <AddressInput value={value} onChange={setValue} />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Disabled</span>
              <AddressInput value={value} onChange={setValue} disabled />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">With placeholder</span>
              <AddressInput value={value} onChange={setValue} placeholder="Enter an address" />
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-500 mb-1">Custom colors</span>
              <AddressInput
                value={value}
                onChange={setValue}
                colors={{
                  border: "#22c55e",
                  background: "#dcfce7",
                  text: "#166534",
                }}
              />
            </div>
          </div>
        </div>

        {/* Manual Implementation using useAddress hook */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <h2 className="text-xl font-semibold text-gray-200">Manual Implementation (useAddressInput Hook)</h2>

          <h3 className="text-lg font-semibold text-gray-200">Shows address when ENS is entered and vice versa</h3>

          {ensAddress ? <div className="bg-[#dae8ff] items-center">Address: {ensAddress}</div> : null}
          {ensName ? (
            <div className="flex bg-[#dae8ff] rounded-l-full items-center">
              {isEnsAvatarLoading && (
                <div className="skeleton bg-base-200 w-[35px] h-[35px] rounded-full shrink-0"></div>
              )}
              {ensAvatar ? (
                <span className="w-[35px]">
                  {
                    // eslint-disable-next-line
                    <img className="w-full rounded-full" src={ensAvatar} alt={`${ensAddress} avatar`} />
                  }
                </span>
              ) : null}
              <span className="text-accent px-2">{ensName}</span>
            </div>
          ) : (
            (isEnsNameLoading || isEnsAddressLoading) && (
              <div className="flex bg-[#dae8ff] rounded-l-full items-center gap-2 pr-2">
                <div className="animate-pulse bg-[#f4f8ff] w-[35px] h-[35px] rounded-full shrink-0"></div>
                <div className="animate-pulse bg-[#f4f8ff] h-3 w-20"></div>
              </div>
            )
          )}
          <InputBase<Address>
            name="address"
            placeholder="Address Input"
            error={ensAddress === null}
            value={manualImplementationValue as Address}
            onChange={(val) => setManualImplementationValue(val)}
            disabled={isEnsAddressLoading || isEnsNameLoading}
          />
        </div>
      </div>
    </div>
  );
};
