import React, { useRef, useEffect } from "react";

type Props = {
  className: string;
  onClick: () => void;
  selected: boolean;
  text: string;
  id?: string;
  ariaLabel?: string;
  title?: string;
};

export default function DropdownOption({
  className,
  onClick,
  selected,
  id,
  ariaLabel,
  text,
  title,
}: Props) {
  const liRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (selected)
      liRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [selected]);

  return (
    /* eslint-disable jsx-a11y/click-events-have-key-events */
    <li
      className={className}
      role="option"
      onClick={onClick}
      aria-selected={selected}
      id={id}
      title={title}
      aria-label={ariaLabel}
      ref={liRef}
    >
      {text}
    </li>
    /* eslint-enable jsx-a11y/click-events-have-key-events */
  );
}
