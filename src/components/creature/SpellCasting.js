/* eslint-disable max-len */
import React from 'react';
import { capitalizeWord } from '../../util/characterSheet';
import Checkbox from '../buttons/CheckBox';

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
      <div className="spell-info">
        <span className="spell-label">
          <b>School:</b>
          {' '}
          { capitalizeWord(spellData.school)}
        </span>
        <span className="spell-label">
          <b>Level:</b>
          {' '}
          {spellData.level}
        </span>
        <span className="spell-label">
          <b>Save DC:</b>
          {' '}
          {spellData.saveDC}
        </span>
        <span className="spell-label">
          <b>Spell MOD:</b>
          {' '}
          {spellData.modifier}
        </span>
        <span className="spell-label">
          <b>Spell Class:</b>
          {' '}
          {spellData.ability}
        </span>
      </div>
      {spellData.spells.map((item) => {
        const isDisabled = slotsExpired(item.slots) && item.level !== '0';
        return (
          <div key={item.level} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <span
              className={`spell-level ${isDisabled ? 'used-spells' : ''}`}
            >
              Level
              {' '}
              {item.level}
            </span>
            {item.slots.map((slot) => (
              <Checkbox
                key={slot.slotIndex}
                checked={slot.used}
                onChange={(ev) => onChangeSlot(ev, item.level, slot.slotIndex)}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
