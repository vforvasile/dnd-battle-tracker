/* eslint-disable react/jsx-props-no-spreading */
import React from "react";

type Props = {
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>
};

function Checkbox({ checked, onChange }: Props) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={checked ? "checked" : ""}
      />
    </div>
  );
}

export default Checkbox;
