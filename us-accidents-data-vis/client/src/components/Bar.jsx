import React from "react";
import { Bar as VXBar } from "@vx/shape";

export default function Bar({ width, height, x, y }) {
  return (
    <VXBar
      x={x}
      y={y}
      width={width}
      height={height}
      fill="rgba(160, 116, 196, 0.69)"
      bottom={0}
    />
  );
}

