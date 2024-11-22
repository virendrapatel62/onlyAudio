import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import clsx from "clsx";

type TProps = React.ComponentProps<"input"> & {
  label?: string;
  containerClassName?: string;
  error?: string;
};

export default function InputGroup(props: TProps) {
  const errorInputClasses = "outline-red-300 outline-1";
  const hasError = !!props.error;

  return (
    <div className={props.containerClassName}>
      {props.label && <Label className="m-2 text-sm">{props.label}</Label>}
      <Input
        {...props}
        className={clsx(
          "mt-2 h-14",
          props.className,
          hasError ? errorInputClasses : ""
        )}
      ></Input>
      {hasError && (
        <small className="m-2 block text-red-400">{props.error}</small>
      )}
    </div>
  );
}
