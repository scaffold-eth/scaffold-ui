import React, { CSSProperties } from "react";
import { useAddress } from "@scaffold-ui/hooks";
import { Chain, type Address as AddressType } from "viem";
import { mainnet } from "viem/chains";
import { AddressLinkWrapper } from "./AddressLinkWrapper";
import { AddressCopyIcon } from "./AddressCopyIcon";
import { textSizeMap, blockieSizeMap, copyIconSizeMap, getNextSize, getPrevSize } from "./utils";

export type AddressProps = {
  address?: AddressType;
  disableAddressLink?: boolean;
  format?: "short" | "long";
  size: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  onlyEnsOrAddress?: boolean;
  chain?: Chain;
  style?: CSSProperties;
};

export const Address: React.FC<AddressProps> = ({
  address,
  disableAddressLink,
  format,
  size = "base",
  onlyEnsOrAddress,
  chain,
  style,
}) => {
  const { checkSumAddress, ens, ensAvatar, isEnsNameLoading, blockExplorerAddressLink, shortAddress, blockieUrl } =
    useAddress({ address, chain: chain || mainnet });

  const displayAddress = format === "long" ? checkSumAddress : shortAddress;
  const displayEnsOrAddress = ens || displayAddress;

  const showSkeleton = !checkSumAddress || (!onlyEnsOrAddress && (ens || isEnsNameLoading));

  const addressSize = showSkeleton && !onlyEnsOrAddress ? getPrevSize(textSizeMap, size, 2) : size;
  const ensSize = getNextSize(textSizeMap, addressSize);
  const blockieSize = showSkeleton && !onlyEnsOrAddress ? getNextSize(blockieSizeMap, addressSize, 4) : addressSize;

  if (!checkSumAddress) {
    return (
      <div className="flex items-center" style={style}>
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
    <div className="flex items-center shrink-0" style={style}>
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
          <AddressCopyIcon
            className={`ml-1 ${copyIconSizeMap[addressSize]} cursor-pointer`}
            address={checkSumAddress}
          />
        </div>
      </div>
    </div>
  );
};
