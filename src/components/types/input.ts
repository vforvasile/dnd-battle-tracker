export type LeftControlType = {
  LeftSubmitIcon: React.ReactNode;
  leftTitle: string;
  leftEnabled?: boolean;
};

export type RightControlType = {
  RightSubmitIcon: React.ReactNode;
  rightTitle: string;
  RightControl?: React.ReactNode;
  rightEnabled?: boolean;
};

export type InputProps = {
  label: string;
  name: string;
  value: string;
  inputId: string;
  submitHandler: (isLeftSubmit: boolean) => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formHandler: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  rightControls?: RightControlType;
  leftControls?: LeftControlType;
  role?: string;
  min?: number;
  max?: number;
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  integer?: boolean;
  required?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
  ariaAutoComplete?: "none" | "inline" | "list" | "both" | undefined;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaActiveDescendant?: string;
  customClasses?: string;
  error?: boolean;
};
