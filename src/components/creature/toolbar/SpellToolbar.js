/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import SpellCreateInput from './SpellCreateInput';

const SPELL_LEVELS = 9;

const levels = Array.from({ length: SPELL_LEVELS }, (_, i) => i + 1);

export default function SpellToolbar({
  creatureId,
  createSpellLevel,
  resetSpells,
}) {
  const styleClass = 'form--input creature-toolbar--select creature-toolbar--dropdown';

  const [currentSpell, setSpellLevel] = useState(1);

  const onChangeLevel = (event) => {
    event.preventDefault();
    setSpellLevel(event.target.value);
  };

  const addSpellSlots = (id, { spellLevel, slotNumber }) => {
    if (!spellLevel || !slotNumber) return;
    createSpellLevel(id, { level: spellLevel, slotNumber });
    setSpellLevel(1);
  };

  const onResetSpells = () => {
    resetSpells(creatureId);
  };

  return (
    <div>
      <h3>Add spells</h3>
      <div className="spell-toolbar">
        <div className="creature-toolbar--dropdown">
          <label htmlFor={creatureId} aria-label="add spells">
            <div className="form--label">Spell Level</div>
            <select
              id={creatureId}
              className={styleClass}
              value={currentSpell}
              name="creature-toolbar-conditions"
              onChange={onChangeLevel}
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {`Level ${level}`}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <SpellCreateInput
            id={creatureId}
            spellLevel={currentSpell}
            addSpellSlots={addSpellSlots}
          />
        </div>
        <span className="reset-spell-button" onClick={onResetSpells}>
          ↻ Reset Spells
        </span>
      </div>
    </div>

  );
}
