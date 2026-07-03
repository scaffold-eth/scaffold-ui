"use client";

import React from "react";
import { EtherInput } from "@scaffold-ui/components";

// The onValueChange demo needs a function prop, which can't be passed to a
// client component from the server MDX module — so it lives here in a client
// component. The other EtherInput examples on the page only pass serializable
// props, so they stay inline in the MDX.
export function EtherInputOnValueChangeExample() {
  return (
    <EtherInput
      placeholder="With onValueChange"
      onValueChange={({ valueInEth, valueInUsd, displayUsdMode }) => {
        console.log({ valueInEth, valueInUsd, displayUsdMode });
      }}
    />
  );
}
