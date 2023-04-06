import React, { useState } from "react";
import isHotkey from "is-hotkey";
import Input from "../../page/Input";
import { LeftControlType, RightControlType } from "../../types/input";

type Props = {
  integer: boolean;
  min: number;
  name: string;
  ariaLabel: string;
  label: string;
  inputId: string;
  rightControls: RightControlType;
  customClasses?: string;
  rightSubmit: (value: string | number) => void;
  leftHotkey?: string;
  rightHotkey?: string;
  leftControls?: LeftControlType;
  leftSubmit?: (value: string | number) => void;
};

export default function CreatureToolbarInput({
  inputId,
  label,
  ariaLabel,
  name,
  leftSubmit,
  rightSubmit,
  leftHotkey,
  rightHotkey,
  min,
  integer = false,
  customClasses = "",
  leftControls,
  rightControls,
}: Props) {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const resetForm = () => {
    setValue("");
  };

  const submitHandler = (isLeftSubmit: boolean) => {
    if (value) {
      resetForm();
      const submittedValue = integer ? parseInt(value, 10) : value;
      const func = isLeftSubmit && leftSubmit ? leftSubmit : rightSubmit;
      func(submittedValue);
    }
  };

  const formHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const isLeftHotkey = leftHotkey && isHotkey(leftHotkey, event);
    const isRightHotkey = rightHotkey && isHotkey(rightHotkey, event);
    const isEnter = isHotkey("enter", event);

    if (isLeftHotkey) {
      event.preventDefault();
      submitHandler(true);
    } else if (isRightHotkey || isEnter) {
      event.preventDefault();
      submitHandler(false);
    }
  };

  return (
    <Input
      integer={integer}
      name={name}
      ariaLabel={ariaLabel}
      label={label}
      min={min}
      value={value}
      handleChange={handleChange}
      submitHandler={submitHandler}
      formHandler={formHandler}
      leftControls={leftControls}
      rightControls={rightControls}
      inputId={inputId}
      customClasses={customClasses}
    />
  );
}
