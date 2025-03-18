import { useState, useCallback } from "react";

/**
 * A hook that manages address information.
 */
export type AddressInfo = {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type UseAddressReturn = {
  address: AddressInfo;
  setAddress: (address: Partial<AddressInfo>) => void;
  resetAddress: () => void;
};

const defaultAddress: AddressInfo = {
  street: "",
  city: "",
  state: "zaragoza",
  zip: "",
  country: "Spain",
};

export function useAddress(
  initialAddress?: Partial<AddressInfo>
): UseAddressReturn {
  const [address, setAddressState] = useState<AddressInfo>({
    ...defaultAddress,
    ...initialAddress,
  });

  const setAddress = useCallback((newAddress: Partial<AddressInfo>) => {
    setAddressState((prev: AddressInfo) => ({
      ...prev,
      ...newAddress,
    }));
  }, []);

  const resetAddress = useCallback(() => {
    setAddressState(defaultAddress);
  }, []);

  return {
    address,
    setAddress,
    resetAddress,
  };
}
