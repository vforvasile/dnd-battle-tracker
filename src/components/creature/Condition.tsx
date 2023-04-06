import React from "react";
import Timer from "../page/Timer";
import ExternalLink from "../page/ExternalLink";
import CrossIcon from "../icons/CrossIcon";
import { ConditionDataType } from "../types/conditions";

type Props = {
  condition: ConditionDataType;
  round: number;
  secondsElapsed: number;
  playerSession: boolean;
  dismissHandler: (creatureId: number, condition: ConditionDataType) => void;
  creatureId: number;
};

export default function Condition({
  condition,
  round,
  secondsElapsed,
  playerSession,
  dismissHandler,
  creatureId,
}: Props) {
  return (
    <div className="creature-note-list--item">
      <div className="creature-note-list--note">
        <b>
          <ExternalLink url={condition.url}>{condition.text}</ExternalLink>
        </b>
        .
        <Timer
          startRound={condition.appliedAtRound}
          endRound={round}
          startTime={condition.appliedAtSeconds}
          endTime={secondsElapsed}
          className="creature-note-list--timer"
        />
      </div>
      {!playerSession && (
        <button
          className="creature-note-list--button"
          title="Remove note"
          onClick={() => dismissHandler(creatureId, condition)}
          type="button"
        >
          <CrossIcon rotate />
        </button>
      )}
    </div>
  );
}