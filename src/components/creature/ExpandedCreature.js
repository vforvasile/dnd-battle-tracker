import React from 'react';
import CreatureNoteList from './CreatureNoteList';
import CreatureStats from './CreatureStats';
import CreatureStatus from './CreatureStatus';
import SpellCasting from './SpellCasting';
import SpellToolbar from './toolbar/SpellToolbar';

export default function ExpandedCreature({
  creature,
  round,
  secondsElapsed,
  removeNoteFromCreature,
  healthPoints,
  showHealth,
  playerSession,
  updateCreatureSpells,
  showSpellCreator,
  resetSpells,
  createSpellLevel,
  addSpellSlot,
  removeSpellSlot,
  active,
}) {
  const {
    initiative, id, conditions, notes, shared,
  } = creature;
  const showInitiative = initiative !== undefined && initiative !== null;

  return (
    <>
      <div>
        <CreatureStatus creature={creature} shared={shared} />
        <div className="expanded-creature--separator" />
        {showHealth && healthPoints}
        {showInitiative
          && (
          <div className="expanded-creature--stat">
            <b>Initiative</b>
            {' '}
            {initiative}
          </div>
          )}
        { (showHealth || showInitiative) && <div className="expanded-creature--separator" /> }
      </div>
      {showSpellCreator && (
      <SpellToolbar
        resetSpells={resetSpells}
        createSpellLevel={createSpellLevel}
        creatureId={id}
      />
      )}

      {creature.spellData && (
      <SpellCasting
        creature={creature}
        active={active}
        updateCreatureSpells={updateCreatureSpells}
        addSpellSlot={addSpellSlot}
        removeSpellSlot={removeSpellSlot}
        showSpellCreator={showSpellCreator}
      />
      )}
      <CreatureNoteList
        creatureId={id}
        label="Conditions"
        noteList={conditions}
        dismissHandler={(creatureId, note) => removeNoteFromCreature(creatureId, note, true)}
        round={round}
        secondsElapsed={secondsElapsed}
        playerSession={playerSession}
        isConditionList
      />
      <CreatureNoteList
        creatureId={id}
        label="Notes"
        noteList={notes}
        dismissHandler={(creatureId, note) => removeNoteFromCreature(creatureId, note, false)}
        round={round}
        secondsElapsed={secondsElapsed}
        playerSession={playerSession}
      />
      {creature.apiData && (
      <CreatureStats
        creature={creature.apiData}
        active={active}
      />
      )}
    </>
  );
}
