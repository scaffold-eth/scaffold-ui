import React from "react";
import { useAddress } from "@scaffold-ui/hooks";
import { type Address as AddressType } from "viem";
import { mainnet } from "viem/chains";

type AddressLinkWrapperProps = {
  children: React.ReactNode;
  disableAddressLink?: boolean;
  blockExplorerAddressLink: string;
};

export const AddressLinkWrapper = ({
  children,
  disableAddressLink,
  blockExplorerAddressLink,
}: AddressLinkWrapperProps) => {
  return disableAddressLink ? (
    <>{children}</>
  ) : (
    <a href={blockExplorerAddressLink} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const textSizeMap = {
  "3xs": "text-[10px]",
  "2xs": "text-[11px]",
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
} as const;

const blockieSizeMap = {
  "3xs": 4,
  "2xs": 5,
  xs: 6,
  sm: 7,
  base: 8,
  lg: 9,
  xl: 10,
  "2xl": 12,
  "3xl": 15,
  "4xl": 17,
  "5xl": 19,
  "6xl": 21,
  "7xl": 23,
} as const;

// const copyIconSizeMap = {
//   "3xs": "h-2.5 w-2.5",
//   "2xs": "h-3 w-3",
//   xs: "h-3.5 w-3.5",
//   sm: "h-4 w-4",
//   base: "h-[18px] w-[18px]",
//   lg: "h-5 w-5",
//   xl: "h-[22px] w-[22px]",
//   "2xl": "h-6 w-6",
//   "3xl": "h-[26px] w-[26px]",
//   "4xl": "h-7 w-7",
// } as const;

type SizeMap = typeof textSizeMap | typeof blockieSizeMap;

const getNextSize = <T extends SizeMap>(sizeMap: T, currentSize: keyof T, step = 1): keyof T => {
  const sizes = Object.keys(sizeMap) as Array<keyof T>;
  const currentIndex = sizes.indexOf(currentSize);
  const nextIndex = Math.min(currentIndex + step, sizes.length - 1);
  return sizes[nextIndex];
};

const getPrevSize = <T extends SizeMap>(sizeMap: T, currentSize: keyof T, step = 1): keyof T => {
  const sizes = Object.keys(sizeMap) as Array<keyof T>;
  const currentIndex = sizes.indexOf(currentSize);
  const prevIndex = Math.max(currentIndex - step, 0);
  return sizes[prevIndex];
};

type AddressProps = {
  address?: AddressType;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  onlyEnsOrAddress?: boolean;
};

export const Address: React.FC<AddressProps> = ({
  address,
  disableAddressLink,
  format,
  size = "base",
  onlyEnsOrAddress,
}) => {
  const { checkSumAddress, ens, ensAvatar, isEnsNameLoading, blockExplorerAddressLink, shortAddress, blockieUrl } =
    useAddress({ address, chain: mainnet });

  const displayAddress = format === "long" ? checkSumAddress : shortAddress;
  const displayEnsOrAddress = ens || displayAddress;

  const showSkeleton = !checkSumAddress || (!onlyEnsOrAddress && (ens || isEnsNameLoading));

  const addressSize = showSkeleton && !onlyEnsOrAddress ? getPrevSize(textSizeMap, size, 2) : size;
  const ensSize = getNextSize(textSizeMap, addressSize);
  const blockieSize = showSkeleton && !onlyEnsOrAddress ? getNextSize(blockieSizeMap, addressSize, 4) : addressSize;

  if (!checkSumAddress) {
    return (
      <div className="flex items-center">
        <div
          className="shrink-0 skeleton rounded-full"
          style={{
            width: (blockieSizeMap[blockieSize] * 24) / blockieSizeMap["base"],
            height: (blockieSizeMap[blockieSize] * 24) / blockieSizeMap["base"],
          }}
        ></div>
        <div className="flex flex-col space-y-1">
          {!onlyEnsOrAddress && (
            <div className={`ml-1.5 skeleton rounded-lg font-bold ${textSizeMap[ensSize]}`}>
              <span className="invisible">0x1234...56789</span>
            </div>
          )}
          <div className={`ml-1.5 skeleton rounded-lg ${textSizeMap[addressSize]}`}>
            <span className="invisible">0x1234...56789</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center shrink-0">
      <div className="shrink-0">
        <img
          className="rounded-full"
          src={ensAvatar || blockieUrl}
          width={(blockieSizeMap[blockieSize] * 24) / blockieSizeMap["base"]}
          height={(blockieSizeMap[blockieSize] * 24) / blockieSizeMap["base"]}
          alt={`${address} avatar`}
        />
      </div>
      <div className="flex flex-col">
        {showSkeleton &&
          (isEnsNameLoading ? (
            <div className={`ml-1.5 skeleton rounded-lg font-bold ${textSizeMap[ensSize]}`}>
              <span className="invisible">{shortAddress}</span>
            </div>
          ) : (
            <span className={`ml-1.5 ${textSizeMap[ensSize]} font-bold`}>
              <AddressLinkWrapper
                disableAddressLink={disableAddressLink}
                blockExplorerAddressLink={blockExplorerAddressLink}
              >
                {ens}
              </AddressLinkWrapper>
            </span>
          ))}
        <div className="flex">
          <span className={`ml-1.5 ${textSizeMap[addressSize]} font-normal`}>
            <AddressLinkWrapper
              disableAddressLink={disableAddressLink}
              blockExplorerAddressLink={blockExplorerAddressLink}
            >
              {onlyEnsOrAddress ? displayEnsOrAddress : displayAddress}
            </AddressLinkWrapper>
          </span>
          Copy
          {/* <AddressCopyIcon
            className={`ml-1 ${copyIconSizeMap[addressSize]} cursor-pointer`}
            address={checkSumAddress}
          /> */}
        </div>
      </div>
    </div>
  );
};
