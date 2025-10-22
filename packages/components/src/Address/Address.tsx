"use client";

import React, { CSSProperties, useMemo } from "react";
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
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  onlyEnsOrAddress?: boolean;
  chain?: Chain;
  style?: CSSProperties;
  blockExplorerAddressLink?: string;
};

/**
 * Address Component
 *
 * Displays an Ethereum address with ENS name resolution, avatar, and copy functionality.
 * - Resolves ENS names and displays ENS avatars when available.
 * - Shows a blockie (identicon) as fallback when no ENS avatar is available.
 * - Provides copy-to-clipboard functionality for the address.
 * - Supports linking to block explorers for address details.
 * - Displays loading skeletons while resolving ENS names.
 *
 * @param {AddressProps} props - The props for the Address component.
 * @param {AddressType} [props.address] - (Optional) The Ethereum address to display.
 * @param {boolean} [props.disableAddressLink] - (Optional) If true, disables the link to block explorer.
 * @param {"short" | "long"} [props.format] - (Optional) Display format for the address. "short" shows truncated version, "long" shows full address.
 * @param {"xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl"} [props.size="base"] - (Optional) Size variant for the component display.
 * @param {boolean} [props.onlyEnsOrAddress] - (Optional) If true, shows only ENS name or address without additional UI elements.
 * @param {Chain} [props.chain] - (Optional) The blockchain network to use for ENS resolution. Defaults to mainnet.
 * @param {CSSProperties} [props.style] - (Optional) Custom CSS styles to apply to the component.
 * @param {string} [props.blockExplorerAddressLink] - (Optional) Custom block explorer URL for the address link.
 *
 * @example
 * <Address address="0x123..." />
 * <Address address="0x123..." format="long" size="lg" />
 * <Address address="0x123..." onlyEnsOrAddress disableAddressLink />
 * <Address address="0x123..." chain={mainnet} blockExplorerAddressLink="https://etherscan.io/address/0x123..." />
 */
export const Address: React.FC<AddressProps> = ({
  address,
  disableAddressLink,
  format,
  size = "base",
  onlyEnsOrAddress,
  chain,
  style,
  blockExplorerAddressLink,
}) => {
  const {
    checkSumAddress,
    ens,
    ensAvatar,
    isEnsNameLoading,
    blockExplorerAddressLink: blockExplorerLink,
    shortAddress,
    blockieUrl,
  } = useAddress({ address, chain: chain || mainnet });
  blockExplorerAddressLink = blockExplorerAddressLink || blockExplorerLink;

  const displayAddress = format === "long" ? checkSumAddress : shortAddress;
  const displayEnsOrAddress = ens || displayAddress;

  const showSkeleton = !checkSumAddress || (!onlyEnsOrAddress && (ens || isEnsNameLoading));

  const addressSize = showSkeleton && !onlyEnsOrAddress ? getPrevSize(textSizeMap, size, 2) : size;
  const ensSize = getNextSize(textSizeMap, addressSize);
  const blockieSize = showSkeleton && !onlyEnsOrAddress ? getNextSize(blockieSizeMap, addressSize, 4) : addressSize;

  const skeletonStyle = useMemo(() => {
    return {
      width: (blockieSizeMap[blockieSize] * 24) / blockieSizeMap["base"],
      height: (blockieSizeMap[blockieSize] * 24) / blockieSizeMap["base"],
    };
  }, [blockieSize]);

  if (!checkSumAddress) {
    return (
      <div className="flex items-center text-sui-primary-content" style={style}>
        <div className="shrink-0 sui-skeleton !rounded-full" style={skeletonStyle}></div>
        <div className="flex flex-col space-y-1">
          {!onlyEnsOrAddress && (
            <div className={`ml-1.5 sui-skeleton rounded-lg font-bold ${textSizeMap[ensSize]}`}>
              <span className="invisible">0x1234...56789</span>
            </div>
          )}
          <div className={`ml-1.5 sui-skeleton rounded-lg ${textSizeMap[addressSize]}`}>
            <span className="invisible">0x1234...56789</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center shrink-0 text-sui-primary-content" style={style}>
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
            <div className={`ml-1.5 sui-skeleton rounded-lg font-bold ${textSizeMap[ensSize]}`}>
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
