/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

function Checkbox({
  label, checked, onChange, ...props
}) {
  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={checked ? 'checked' : ''}
        {...props}
      />
    </div>
  );
}

export default Checkbox;
