/* eslint-disable max-len */
import React from 'react';

export default function SpellCasting({
  spellData,
  active,
}) {
  console.log('spells', spellData);

  const onChangeSlot = (event, level, slotIndex) => {
    const { checked } = event.target;
    console.log('checked', checked);
    console.log('level', level);
    console.log('slotIndex', slotIndex);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>{spellData.school}</p>
      <p>{spellData.dc}</p>
      <p>{spellData.modifier}</p>
      <p>{spellData.ability}</p>
      {spellData.spells.map((item) => (
        <div style={{ display: 'flex', flexDirection: 'column' }} key={item.level}>
          {/* <input value={item} type="checkbox" /> */}

          <div style={{ display: 'flex', flexDirection: 'row' }}>
          <span>
            Level 
            {' '}
            {item.level}
          </span>
            {item.slots.map((slot) => (
              <div key={slot.slotIndex}>
                <input onChange={(ev) => onChangeSlot(ev, item.level, slot.slotIndex)} checked={slot.used} type="checkbox" />
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  );
}
