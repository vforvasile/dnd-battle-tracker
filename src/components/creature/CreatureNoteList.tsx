import React from "react";
import {
    isConditionType,
    isNoteType, NoteOrCondition
} from "../types/notes";
import Condition from "./Condition";
import Note from "./Note";

type Props = {
  creatureId: number;
  label: string;
  noteList: NoteOrCondition[];
  dismissHandler: (creatureId: number, note: NoteOrCondition) => void;
  round: number;
  secondsElapsed: number;
  playerSession: boolean;
  isConditionList: boolean;
};

function CreatureNoteList({
  creatureId,
  label,
  noteList,
  dismissHandler,
  round,
  secondsElapsed,
  playerSession,
  isConditionList,
}: Props) {
  if (noteList.length === 0) {
    return null;
  }

  const renderCondition = (condition: NoteOrCondition) => {
    if (isConditionType(condition)) {
      return (
        <Condition
          condition={condition}
          round={round}
          secondsElapsed={secondsElapsed}
          playerSession={playerSession}
          dismissHandler={dismissHandler}
          creatureId={creatureId}
          key={condition.id}
        />
      );
    }
    return null;
  };

  const renderNote = (note: NoteOrCondition, number: number) => {
    if (isNoteType(note)) {
      return (
        <Note
          note={note}
          number={number}
          round={round}
          secondsElapsed={secondsElapsed}
          key={`${note.id}-${creatureId}`}
        />
      );
    }
    return null;
  };

  const firstNote = noteList[0];
  const otherNotes = noteList.slice(1);
  const labelKey = isConditionList
    ? `first-condition-${creatureId}`
    : `first-note-${creatureId}`;

  return (
    <>
      <div key={labelKey}>
        <div className="creature-note-list--label">{label}</div>
        {isConditionList
          ? renderCondition(firstNote)
          : renderNote(firstNote, 1)}
      </div>
      {otherNotes.map((note, i) =>
        isConditionList ? renderCondition(note) : renderNote(note, i + 2),
      )}
    </>
  );
}

export default CreatureNoteList;
