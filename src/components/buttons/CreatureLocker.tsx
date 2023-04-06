import React from 'react';
import LockedIcon from '../icons/LockedIcon';
import UnlockedIcon from '../icons/UnlockedIcon';

type Props = {
  locked: boolean;
  name: string;
  lockHandler: () => void;
}

function CreatureLocker({ locked, name, lockHandler }:Props) {
  const buttonTitle = locked ? 'Creature locked' : 'Creature unlocked';
  const buttonIcon = locked ? <LockedIcon /> : <UnlockedIcon />;
  const buttonAriaLabel = locked ? `${name} locked` : `${name} unlocked`;

  return (
    <button
      aria-label={buttonAriaLabel}
      className="creature-title-button"
      title={buttonTitle}
      onClick={lockHandler}
      type="button"
    >
      {buttonIcon}
    </button>
  );
}

export default CreatureLocker;
