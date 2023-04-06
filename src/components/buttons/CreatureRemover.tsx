import React, { useState } from "react";
import RemoveCreatureIcon from "../icons/RemoveCreatureIcon";
import { CreatureType } from "../types/creature";

type Props = {
  creature: CreatureType;
  removeCreature: (id: number) => void;
  disabled: boolean;
};

export default function CreatureRemover({
  creature,
  removeCreature,
  disabled,
}: Props) {
  const [removing, setRemoving] = useState(false);
  const { name, id } = creature;
  const disabledClassModifier = disabled ? "button__disabled" : "";

  return (
    <>
      {!removing && (
        <button
          aria-label={`remove ${name}`}
          title="Remove creature"
          className={disabledClassModifier}
          onClick={() => setRemoving(true)}
          type="button"
          disabled={disabled}
        >
          <RemoveCreatureIcon />
        </button>
      )}
      {removing && (
        <button
          aria-label={`confirm remove ${creature.name}`}
          title="Confirm remove creature"
          className={`expanded-creature--confirm-remove-button ${disabledClassModifier}`}
          onClick={() => removeCreature(id)}
          type="button"
          disabled={disabled}
        >
          <RemoveCreatureIcon />
          <div>Confirm</div>
        </button>
      )}
    </>
  );
}
