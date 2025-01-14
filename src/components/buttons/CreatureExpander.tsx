import React, { ButtonHTMLAttributes, useLayoutEffect, useRef } from 'react';
import ExpandIcon from '../icons/ExpandIcon';
import CollapseIcon from '../icons/CollapseIcon';
import ActiveCreatureIcon from '../icons/ActiveCreatureIcon';

type Props = {
  classes: string;
  active: boolean;
  expanded: boolean;
  name: string;
  expandHandler: () => void;
  focused: boolean;
}

function CreatureExpander({
  classes, active, expanded, name, expandHandler, focused,
}:Props) {
  const buttonRef = useRef(null);

  const buttonTitle = expanded ? 'Collapse creature' : 'Expand creature';
  const buttonIcon = expanded ? <CollapseIcon /> : <ExpandIcon />;
  const buttonAriaLabel = expanded ? `collapse ${name}` : `expand ${name}`;

  const baseClass = 'creature-expander-button';
  const modifierClass = active ? `${baseClass}__disabled` : '';
  const className = `${baseClass} ${modifierClass} ${classes}`;

  useLayoutEffect(() => {
    if (focused) {
      // NOTE: hack to get around TS error, still uncertain why this is needed
      // @ts-ignore
      buttonRef?.current?.focus?.();
    }
  }, [focused]);

  const onClick = () => {
    if (!active) {
      expandHandler();
    }
  };

  return (
    <button
      aria-label={buttonAriaLabel}
      className={className}
      title={buttonTitle}
      onClick={onClick}
      type="button"
      ref={buttonRef}
      aria-disabled={active}
      aria-expanded={expanded}
    >
      {name}
      {!active && <div className="creature-expander-icon">{buttonIcon}</div>}
      {active && <ActiveCreatureIcon className="creature-expander-icon" />}
    </button>
  );
}

export default CreatureExpander;
