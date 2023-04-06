import React from "react";

type Props = {
  url: string;
  children: React.ReactNode;
  className?: string;
  title?: string;
  ariaLabel?: string;
  anchorRef?: React.Ref<HTMLAnchorElement>;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

function ExternalLink({
  url,
  children,
  className,
  title,
  ariaLabel,
  anchorRef,
  onClick,
}: Props) {
  return (
    <a
      title={title}
      aria-label={ariaLabel}
      className={className}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={anchorRef}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

export default ExternalLink;
