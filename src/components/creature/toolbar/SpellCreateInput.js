import React from 'react';
import CreatureToolbarInput from './CreatureToolbarInput';
import InitiativeIcon from '../../icons/InitiativeIcon';

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
        rightTitle: 'Add spell slots',
        RightSubmitIcon: <InitiativeIcon />,
      }}
      inputId={`spellLevel-${id}`}
    />
  );
}
