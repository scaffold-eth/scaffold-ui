"use client";
import React, { useState } from "react";
import { useAddressInput } from "@scaffold-ui/hooks";

export const UseAddressInputBasicExample = () => {
  const [value, setValue] = useState("");
  const { ensAddress, isEnsAddressLoading } = useAddressInput({ value });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter ENS name (e.g., vitalik.eth)"
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
        }}
      />

      {isEnsAddressLoading && <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>Resolving...</p>}

      {ensAddress && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          <strong>Address:</strong> {ensAddress}
        </p>
      )}
    </div>
  );
};

export const UseAddressInputWithResolutionExample = () => {
  const [value, setValue] = useState("");
  const {
    ensAddress,
    ensName,
    ensAvatar,
    isEnsAddressLoading,
    isEnsNameLoading
  } = useAddressInput({ value });

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Try: vitalik.eth or 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"
        disabled={isEnsAddressLoading || isEnsNameLoading}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
        }}
      />

      {(isEnsAddressLoading || isEnsNameLoading) && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>Resolving...</p>
      )}

      {ensAddress && (
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem" }}>
          <strong>Resolved Address:</strong> {ensAddress}
        </p>
      )}

      {ensName && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem", fontSize: "0.875rem" }}>
          {ensAvatar && <img src={ensAvatar} alt={ensName} style={{ width: "24px", height: "24px", borderRadius: "50%" }} />}
          <span><strong>Resolved ENS:</strong> {ensName}</span>
        </div>
      )}
    </div>
  );
};

export const UseAddressInputErrorExample = () => {
  const [value, setValue] = useState("");
  const {
    ensAddress,
    isEnsAddressLoading,
    isEnsAddressError,
    isEnsAddressSuccess
  } = useAddressInput({ value });

  const showError = !isEnsAddressLoading && value && (isEnsAddressError || (isEnsAddressSuccess && ensAddress === null));

  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter ENS name (try: invalidensname.eth)"
        style={{
          width: "100%",
          maxWidth: "300px",
          padding: "0.5rem 0.75rem",
          fontSize: "0.875rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
        }}
      />

      {isEnsAddressLoading && <p>Resolving...</p>}

      {showError && (
        <p style={{ color: "red" }}>✗ Could not resolve ENS name</p>
      )}

      {ensAddress && (
        <p style={{ color: "green" }}>✓ Resolved: {ensAddress}</p>
      )}
    </div>
  );
};
