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
  addSpellSlot,
  removeSpellSlot,
  showSpellCreator,
}) {
  const { spellData } = creature;

  const [showSpells, setShowSpells] = useState(active || showSpellCreator);

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

  const toggleSpells = () => {
    setShowSpells((prevValue) => !prevValue);
  };

  if (!showSpells) {
    return (
      <div className="creature-title-header">
        <button id="close-spell-stats" type="button" onClick={toggleSpells}>▼ Show  Spells</button>
      </div>
    );
  }

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 30 }}>
      <div className="spell-info">
        {spellData.school && (
        <span className="spell-label">
          <b>School:</b>
          {' '}
          {capitalizeWord(spellData.school)}
        </span>
        )}
        {spellData.level && (
        <span className="spell-label">
          <b>Level:</b>
          {' '}
          {spellData.level}
        </span>
        )}
        {spellData.saveDC && (
        <span className="spell-label">
          <b>Save DC:</b>
          {' '}
          {spellData.saveDC}
        </span>
        )}
        {spellData.modifier && (
        <span className="spell-label">
          <b>Spell MOD:</b>
          {' '}
          {spellData.modifier}
        </span>
        )}
        {spellData.ability && (
        <span className="spell-label">
          <b>Spell Class:</b>
          {' '}
          {spellData.ability}
        </span>
        )}
      </div>
      {spellData.spells.map((item) => {
        if (item.level === '0') return null;
        const isDisabled = slotsExpired(item.slots);
        return (
          <div
            onFocus={() => {}}
            onMouseOver={() => {
              if (isDisabled) return;
              handleMouseOver(item.level);
            }}
            onClick={onClickRandom}
            key={`Item-Level-${item.level}`}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
          >
            <span
              className={`spell-level ${isDisabled ? 'used-spells' : ''}`}
            >
              Level
              {' '}
              {item.level}
            </span>
            {item.slots.map((slot) => (
              <Checkbox
                key={`Level-${item.level}-${slot.slotIndex}`}
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
      <div style={{ alignSelf: 'flex-start' }}>
        <button id="close-creature-stats" type="button" onClick={toggleSpells}>▲ Hide  spells</button>
      </div>

    </div>
  );
}
