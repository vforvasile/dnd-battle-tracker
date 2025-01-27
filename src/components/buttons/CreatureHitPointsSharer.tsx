import React from 'react';
import ShareHitPointsIcon from '../icons/ShareHitPointsIcon';

type Props = {
  shared: boolean;
  name: string;
  shareHandler: () => void;
}

function CreatureHitPointsSharer({
  shared,
  name,
  shareHandler,
}:Props) {
  const buttonTitle = shared ? 'Creature hit points share enabled' : 'Creature hit points share disabled';
  const buttonAriaLabel = shared ? `${name} hit points share enabled` : `${name} hit points share disabled`;
  const buttonClass = 'creature-title-button';

  return (
    <button
      aria-label={buttonAriaLabel}
      className={buttonClass}
      title={buttonTitle}
      onClick={shareHandler}
      type="button"
    >
      <ShareHitPointsIcon enabled={shared} />
    </button>
  );
}

export default CreatureHitPointsSharer;
