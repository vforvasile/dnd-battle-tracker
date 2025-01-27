import React from "react";
import { ConditionDataType } from "../types/conditions";
import { CreatureType } from "../types/creature";
import { NoteDataType } from "../types/notes";

function commaSeparate(
  notes: (NoteDataType | ConditionDataType)[],
  trailing: boolean,
) {
  const suffix = trailing ? "," : "";
  return (
    notes
      .map((note) => `${note.text[0].toUpperCase()}${note.text.substring(1)}`)
      .join(", ") + suffix
  );
}

type Props = {
  creature: CreatureType;
  healthPoints: number;
  showHealth: boolean;
};

function CollapsedCreature({ creature, healthPoints, showHealth }: Props) {
  const showConditions = creature.conditions.length > 0;
  const showNotes = creature.notes.length > 0;
  const conditionsMarginClass = showHealth
    ? "collapsed-creature--status__margin"
    : "";
  const notesMarginClass =
    showHealth || showConditions ? "collapsed-creature--status__margin" : "";
  return (
    <div className="collapsed-creature">
      <div className="collapsed-creature--status">
        {showHealth && healthPoints}
        {showHealth && (showConditions || showNotes) && ","}
        {showConditions && (
          <div className={`collapsed-creature--notes ${conditionsMarginClass}`}>
            {commaSeparate(creature.conditions, showNotes)}
          </div>
        )}
        {showNotes && (
          <div className={`collapsed-creature--notes ${notesMarginClass}`}>
            {commaSeparate(creature.notes, false)}
          </div>
        )}
      </div>
    </div>
  );
}

export default CollapsedCreature;
