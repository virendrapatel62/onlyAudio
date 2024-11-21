import React, { PropsWithChildren } from "react";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

export default function DeviceFrame(props: PropsWithChildren) {
  return props.children;

  return (
    <div className="flex bg-slate-900 justify-center items-center h-dvh w-dvw">
      <DeviceFrameset device="iPhone 8 Plus" color="gold">
        {props.children}
      </DeviceFrameset>
    </div>
  );
}
