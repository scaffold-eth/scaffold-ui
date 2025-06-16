import React from "react";
import { useAddress } from "@scaffold-ui/hooks";
import { type Address as AddressType, type Chain } from "viem";

export interface AddressProps {
  /** The address to display */
  address?: AddressType;
  /** The chain to use for block explorer links */
  chain?: Chain;
  /** Whether to show the ENS name if available */
  showEns?: boolean;
  /** Whether to show the blockie avatar */
  showAvatar?: boolean;
  /** Whether to show a link to the block explorer */
  showLink?: boolean;
  /** Whether to display the short format of the address */
  showShortAddress?: boolean;
  /** Custom className for styling */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export const Address: React.FC<AddressProps> = ({
  address,
  chain,
  showEns = true,
  showAvatar = false,
  showLink = true,
  showShortAddress = true,
  className = "",
  style,
}) => {
  const {
    checkSumAddress,
    ens,
    ensAvatar,
    isEnsNameLoading,
    blockExplorerAddressLink,
    isValidAddress,
    shortAddress,
    blockieUrl,
  } = useAddress({ address, chain });

  if (!checkSumAddress || !isValidAddress) {
    return (
      <span className={`text-gray-400 ${className}`} style={style}>
        Invalid address
      </span>
    );
  }

  const displayName =
    showEns && ens && !isEnsNameLoading
      ? ens
      : showShortAddress
        ? shortAddress
        : checkSumAddress;
  const avatarSrc = showEns && ensAvatar ? ensAvatar : blockieUrl;

  const addressContent = (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      style={style}
    >
      {showAvatar && avatarSrc && (
        <img
          src={avatarSrc}
          alt="Address avatar"
          className="w-6 h-6 rounded-full"
        />
      )}
      <span className="font-mono text-sm">
        {isEnsNameLoading ? "Loading..." : displayName}
      </span>
    </span>
  );

  if (showLink && blockExplorerAddressLink) {
    return (
      <a
        href={blockExplorerAddressLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`hover:underline text-blue-600 hover:text-blue-800 ${className}`}
        style={style}
        title={`View on block explorer: ${checkSumAddress}`}
      >
        {addressContent}
      </a>
    );
  }

  return addressContent;
};
