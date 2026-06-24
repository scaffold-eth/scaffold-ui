"use client";
import React from "react";
import { useAddress } from "@scaffold-ui/hooks";

export function UseAddressBasicExample() {
  const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const { checkSumAddress, shortAddress, blockExplorerAddressLink } = useAddress({ address });
  return (
    <div>
      <p>Short: {shortAddress}</p>
      <p>
        Full with blockexplorer link:{" "}
        <a
          href={blockExplorerAddressLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {checkSumAddress}
        </a>
      </p>
    </div>
  );
}

export function UseAddressWithAvatarExample() {
  const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const { ens, ensAvatar, blockieUrl, shortAddress } = useAddress({ address });
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <img
        src={ensAvatar ?? blockieUrl}
        alt="Avatar"
        style={{ width: "40px", height: "40px", borderRadius: "50%" }}
      />
      <span>{ens ?? shortAddress}</span>
    </div>
  );
}

export function UseAddressLoadingExample() {
  const address = "0xd8da6bf26964af9d7eed9e03e53415d37aa96045";
  const { ens, shortAddress, isEnsNameLoading } = useAddress({ address });
  return <div>{isEnsNameLoading ? <span>Loading ENS name...</span> : <span>{ens ?? shortAddress}</span>}</div>;
}
