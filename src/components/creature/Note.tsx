import React from "react";
import Timer from "../page/Timer";
import { NoteDataType } from "../types/notes";

type Props = {
  note: NoteDataType;
  number: number;
  round: number;
  secondsElapsed: number;
};

export default function Note({ note, number, round, secondsElapsed }: Props) {
  return (
    <div className="creature-note-list--item">
      <div className="creature-note-list--note">
        <span>
          <b>{number}.</b>{" "}
          {`${note.text[0].toUpperCase()}${note.text.substring(1)}`}
        </span>
        .
        <Timer
          startRound={note.appliedAtRound}
          endRound={round}
          startTime={note.appliedAtSeconds}
          endTime={secondsElapsed}
          className="creature-note-list--timer"
        />
      </div>
    </div>
  );
}
