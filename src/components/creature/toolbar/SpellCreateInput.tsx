import React from 'react';
import CreatureToolbarInput from './CreatureToolbarInput';
import CrossIcon from '../../icons/CrossIcon';

type Props = {
  id: number;
  spellLevel: number;
  addSpellSlots: (id: number, data: {spellLevel: number, slotNumber: number}) => void;
}

export default function SpellCreateInput({
  id,
  spellLevel,
  addSpellSlots,
}:Props) {
  return (
    <CreatureToolbarInput
      customClasses="spell-input"
      integer
      ariaLabel={`add spell slots for level ${spellLevel}`}
      label="Number of slots"
      rightSubmit={(currentNumber) => {
        const slotNumber = typeof currentNumber === 'string' ? parseInt(currentNumber) : currentNumber;
        addSpellSlots(id, { spellLevel, slotNumber })
      }}
      rightControls={{
        rightEnabled: true,
        rightTitle: 'Add spell slots',
        RightSubmitIcon: <CrossIcon />,
      }}
      inputId={`spellLevel-${id}`}
    />
  );
}
