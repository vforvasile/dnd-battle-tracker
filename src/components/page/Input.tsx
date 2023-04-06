import React from "react";
import { InputProps } from "../types/input";

function isInputDisabled(leftEnabled?: boolean, rightEnabled?: boolean) {
  if (leftEnabled !== undefined && rightEnabled !== undefined) {
    return leftEnabled === false && rightEnabled === false;
  }

  return leftEnabled === false || rightEnabled === false;
}

function Input({
  integer,
  error,
  required,
  inputRef,
  leftControls,
  rightControls,
  customClasses,
  ariaLabel,
  ariaAutoComplete,
  ariaExpanded,
  ariaControls,
  ariaActiveDescendant,
  role,
  label,
  name,
  min,
  max,
  value,
  submitHandler,
  handleChange,
  formHandler,
  inputId,
  onClick,
  onBlur,
}: InputProps) {
  const rightEnabled = rightControls?.rightEnabled ?? true;
  const RightSubmitIcon = rightControls?.RightSubmitIcon ?? null;
  const RightControl = rightControls?.RightControl ?? null;
  const rightTitle = rightControls?.rightTitle ?? "";

  const leftEnabled = leftControls?.leftEnabled;
  const LeftSubmitIcon = leftControls?.LeftSubmitIcon ?? null;
  const leftTitle = leftControls?.leftTitle ?? "";

  const type = integer ? "number" : "text";
  const numberModifier = integer ? "input--number" : "";

  const inputErrorClass = error ? "input__error" : "";

  const leftDisabled = leftEnabled === false;
  const rightDisabled = rightEnabled === false;
  const inputDisabled = isInputDisabled(leftEnabled, rightEnabled);

  const buttonClass = "input--submit";
  const leftButtonClasses = leftDisabled
    ? `${buttonClass} ${buttonClass}__left ${buttonClass}__disabled`
    : `${buttonClass} ${buttonClass}__left`;
  const rightButtonClasses = rightDisabled
    ? `${buttonClass} ${buttonClass}__right ${buttonClass}__disabled`
    : `${buttonClass} ${buttonClass}__right`;

  const inputClassDisabled = inputDisabled ? "input__disabled" : "";
  const inputClassRightModifier =
    RightSubmitIcon || RightControl ? "input__button-right" : "";
  const inputClassLeftModifier = LeftSubmitIcon ? "input__button-left" : "";
  const inputClassLeftDisabled = leftDisabled
    ? "input__button-left-disabled"
    : "";
  const inputClassRightDisabled = rightDisabled
    ? "input__button-right-disabled"
    : "";
  const inputClasses = `input ${inputClassDisabled} ${inputClassLeftModifier} ${inputClassLeftDisabled} ${inputClassRightModifier} ${inputClassRightDisabled}`;

  const leftSubmit = () => submitHandler(true);
  const rightSubmit = () => submitHandler(false);

  return (
    <div className={`input--form ${numberModifier} ${customClasses}`}>
      <label aria-label={ariaLabel} htmlFor={inputId}>
        <div className="form--label">
          {label}
          {error}
        </div>
        <div className={`input-wrapper ${inputErrorClass}`}>
          {LeftSubmitIcon && (
            <button
              disabled={leftDisabled}
              type="button"
              className={leftButtonClasses}
              title={leftTitle}
              onClick={leftSubmit}
            >
              {LeftSubmitIcon}
            </button>
          )}
          <input
            id={inputId}
            required={required}
            className={inputClasses}
            ref={inputRef}
            name={name}
            type={type}
            min={min}
            max={max}
            value={value}
            onChange={handleChange}
            onKeyDown={formHandler}
            disabled={inputDisabled}
            onClick={onClick}
            onBlur={onBlur}
            aria-autocomplete={ariaAutoComplete}
            aria-expanded={ariaExpanded}
            aria-controls={ariaControls}
            aria-activedescendant={ariaActiveDescendant}
            role={role}
          />
          {RightControl && (
            <div
              className={`button ${rightButtonClasses}`}
              style={{ display: "flex", justifyContent: "center" }}
            >
              {RightControl}
            </div>
          )}
          {!RightControl && RightSubmitIcon && (
            <button
              disabled={rightDisabled}
              type="button"
              className={rightButtonClasses}
              title={rightTitle}
              onClick={rightSubmit}
            >
              {RightSubmitIcon}
            </button>
          )}
        </div>
      </label>
    </div>
  );
}

export default Input;
