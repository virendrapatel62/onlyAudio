import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import clsx from "clsx";

type TProps = React.ComponentProps<"input"> & {
  label?: string;
  containerClassName?: string;
};

export default function InputGroup(props: TProps) {
  return (
    <div className={props.containerClassName}>
      {props.label && <Label className="m-2 text-sm">{props.label}</Label>}
      <Input {...props} className={clsx("mt-2 h-14", props.className)}></Input>
    </div>
  );
}
