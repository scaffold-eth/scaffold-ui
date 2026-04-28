import React from "react";

type AddressLinkWrapperProps = {
  children: React.ReactNode;
  disableAddressLink?: boolean;
  blockExplorerAddressLink?: string;
};

export const AddressLinkWrapper = ({
  children,
  disableAddressLink,
  blockExplorerAddressLink,
}: AddressLinkWrapperProps) => {
  if (disableAddressLink || !blockExplorerAddressLink) {
    return <>{children}</>;
  }
  const isRelative = blockExplorerAddressLink.startsWith("/");
  return (
    <a
      href={blockExplorerAddressLink}
      {...(isRelative ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
};
