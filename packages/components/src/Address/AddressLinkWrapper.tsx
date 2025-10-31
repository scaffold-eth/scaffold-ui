import React from "react";

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
    <a
      href={blockExplorerAddressLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};
