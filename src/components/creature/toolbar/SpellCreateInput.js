import React from 'react';
import CreatureToolbarInput from './CreatureToolbarInput';
import CrossIcon from '../../icons/CrossIcon';

export default function SpellCreateInput({
  id,
  spellLevel,
  addSpellSlots,
}) {
  return (
    <CreatureToolbarInput
      customClasses="spell-input"
      integer
      ariaLabel={`add spell slots for level ${spellLevel}`}
      label="Number of slots"
      rightSubmit={(slotNumber) => addSpellSlots(id, { spellLevel, slotNumber })}
      rightControls={{
        rightEnabled: true,
        rightTitle: 'Add spell slots',
        RightSubmitIcon: <CrossIcon />,
      }}
      inputId={`spellLevel-${id}`}
    />
  );
}
