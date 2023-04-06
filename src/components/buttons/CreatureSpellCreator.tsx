import React from 'react';
import SpellScrollIcon from '../icons/SpellScroll';

type Props = {
  toggled: boolean;
  name: string;
  onToggleCreateSpell: () => void;
}

function CreatureSpellCreator({
  toggled,
  name,
  onToggleCreateSpell,
}:Props) {
  const buttonTitle = `Creature spells creator ${toggled ? 'enabled' : 'disabled'}`;
  const buttonAriaLabel = `${name} hit points share ${toggled ? 'enabled' : 'disabled'}`;
  const buttonClass = 'creature-title-button';

  return (
    <button
      aria-label={buttonAriaLabel}
      className={buttonClass}
      title={buttonTitle}
      onClick={onToggleCreateSpell}
      type="button"
    >
      <SpellScrollIcon enabled={toggled} />
    </button>
  );
}

export default CreatureSpellCreator;
