import React from "react";
import CreatureToolbarInput from "./CreatureToolbarInput";
import InitiativeIcon from "../../icons/InitiativeIcon";

type Props = {
  name: string;
  id: number;
  initiative?: number;
  addInitiativeToCreature: (id: number, initiative: string | number) => void;
};

export default function InitiativeTool({
  name,
  id,
  initiative,
  addInitiativeToCreature,
}: Props) {
  return (
    initiative === undefined && (
      <CreatureToolbarInput
        customClasses="creature-toolbar--last"
        integer
        ariaLabel={`add initiative to ${name}`}
        label="Initiative"
        rightSubmit={(initiativeInput) =>
          addInitiativeToCreature(id, initiativeInput)
        }
        rightControls={{
          rightEnabled: true,
          rightTitle: "Initiative",
          RightSubmitIcon: <InitiativeIcon />,
        }}
        inputId={`initiative-${id}`}
      />
    )
  );
}
