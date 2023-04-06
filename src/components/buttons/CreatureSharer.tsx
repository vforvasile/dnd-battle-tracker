import React from 'react';
import ShareIcon from '../icons/ShareIcon';


type Props = {
  shared: boolean;
  name: string;
  shareHandler: () => void;
  disabled: boolean;
}

function CreatureSharer({
  shared,
  name,
  shareHandler,
  disabled,
}:Props) {
  const buttonTitle = shared ? 'Creature share enabled' : 'Creature share disabled';
  const buttonAriaLabel = shared ? `${name} share enabled` : `${name} share disabled`;
  const buttonClass = 'creature-title-button';
  const buttonClasses = disabled ? `${buttonClass} button__disabled` : buttonClass;

  return (
    <button
      aria-label={buttonAriaLabel}
      className={buttonClasses}
      title={buttonTitle}
      onClick={shareHandler}
      type="button"
      disabled={disabled}
    >
      <ShareIcon enabled={shared} />
    </button>
  );
}

export default CreatureSharer;
