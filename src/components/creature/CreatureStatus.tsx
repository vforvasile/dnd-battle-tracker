import React from "react";
import { isCreatureStable } from "../../state/CreatureManager";
import { CreatureType } from "../types/creature";

type Props = {
  creature: CreatureType;
  shared: boolean;
};

export default function CreatureStatus({ creature, shared }: Props) {
  const { alive } = creature;
  const stable = isCreatureStable(creature);
  const dyingMessage = alive ? [] : ["Dying/dead"];
  const stableMessage = stable ? ["Stable"] : [];
  const sharedMessage = shared ? [] : ["Not shared"];
  const messages = dyingMessage.concat(stableMessage, sharedMessage);
  const renderStatus = messages.length > 0;
  if (renderStatus) {
    return (
      <div className="expanded-creature--status">
        <em>{messages.join(", ")}</em>
      </div>
    );
  }
  return null;
}
