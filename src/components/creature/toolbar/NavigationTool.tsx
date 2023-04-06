import React from "react";
import PageNavigationIcon from "../../icons/PageNavigationIcon";

type Props = {
  name: string;
  previous: boolean;
  navRef: React.RefObject<HTMLButtonElement>;
  navFunc: () => void;
};

export default function NavigationTool({
  name,
  previous,
  navRef,
  navFunc,
}: Props) {
  const title = previous ? "Previous creature tools" : "More creature tools";
  const buttonClass = "creature-toolbar--button";
  const toolClass = `${buttonClass} ${buttonClass}__navigation`;

  return (
    <button
      className={toolClass}
      aria-label={`${name} ${title}`}
      title={title}
      onClick={navFunc}
      type="button"
      ref={navRef}
    >
      <PageNavigationIcon previous={previous} />
    </button>
  );
}
