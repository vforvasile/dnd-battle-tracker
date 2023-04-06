import React from 'react';
import D20Icon from '../icons/D20Icon';

type Props = {
  diceRoll: number;
  onPressDice: () => void;
}

export default function InitiativeGenerator({
  diceRoll,
  onPressDice,
}:Props) {
  return (

    <button
      aria-label={`Initiative value ${diceRoll}`}
      title="Roll D20 dice"
      className="input--submit input--submit__right"
      onClick={onPressDice}
      type="button"
    >
      <D20Icon />
    </button>
  );
}
