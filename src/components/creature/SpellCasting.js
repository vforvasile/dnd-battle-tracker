/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { capitalizeWord } from '../../util/characterSheet';
import Checkbox from '../buttons/CheckBox';

const slotsExpired = (slots) => slots.every((slot) => slot.used);

export default function SpellCasting({
  creature,
  active,
  updateCreatureSpells,
  resetSpells,
  addSpellSlot,
  removeSpellSlot,
}) {
  const { spellData } = creature;

  const [isHovering, setIsHovering] = useState(false);
  const [hoverLevel, setLevel] = useState('');

  const handleMouseOver = (level) => {
    setLevel(level);
    setIsHovering(true);
  };

  const onClickRandom = () => {
    setIsHovering(false);
    setLevel('');
  };

  if (!spellData) return null;

  console.log('SpellCasting data', spellData);

  const onChangeSlot = (event, level, slotIndex) => {
    const { checked } = event.target;
    updateCreatureSpells(creature.id, { level, slotIndex, value: checked });
  };

  const onAddSpellSlot = (level) => {
    addSpellSlot(creature.id, level);
    handleMouseOver(level);
  };

  const onRemoveSpellSlot = (level) => {
    removeSpellSlot(creature.id, level);
    handleMouseOver(level);
  };

  const onResetSpells = () => {
    resetSpells(creature.id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 30 }}>
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
        <span className="reset-spell-button" onClick={onResetSpells}>
          ↻ Reset Spells
        </span>
      </div>
      {spellData.spells.map((item) => {
        if (item.level === '0') return null;
        const isDisabled = slotsExpired(item.slots);
        return (
          <div onFocus={() => {}} onMouseOver={() => handleMouseOver(item.level)} onClick={onClickRandom} key={item.level} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
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
            {isHovering && item.level === hoverLevel && !isDisabled && (
            <div className="wrap-spell-buttons">
              <button onClick={() => onRemoveSpellSlot(item.level)} type="button" className="edit-spell">
                -
              </button>
              <button onClick={() => onAddSpellSlot(item.level)} type="button" className="edit-spell">
                +
              </button>
            </div>
            )}

          </div>
        );
      })}
    </div>
  );
}
