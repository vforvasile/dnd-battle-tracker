/* eslint-disable max-len */
import React from 'react';

const slotsExpired = (slots) => slots.every((slot) => slot.used);

export default function SpellCasting({
  creature,
  active,
  updateCreatureSpells,
}) {
  const { spellData } = creature;
  if (!spellData) return null;
  console.log('SpellCasting data', spellData);

  const onChangeSlot = (event, level, slotIndex) => {
    const { checked } = event.target;
    updateCreatureSpells(creature.id, { level, slotIndex, value: checked });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <p>{spellData.school}</p>
      <p>{spellData.dc}</p>
      <p>{spellData.modifier}</p>
      <p>{spellData.ability}</p>
      {spellData.spells.map((item) => {
        const isDisabled = slotsExpired(item.slots) && item.level !== '0';
        return (
          <div style={{ display: 'flex', flexDirection: 'column' }} key={item.level}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <p className={isDisabled ? 'used-spells' : ''}>
                Level
                {' '}
                {item.level}
              </p>
              {item.slots.map((slot) => (
                <div key={slot.slotIndex}>
                  <input onChange={(ev) => onChangeSlot(ev, item.level, slot.slotIndex)} checked={slot.used} type="checkbox" />
                </div>
              ))}
            </div>

          </div>
        );
      })}
    </div>
  );
}
