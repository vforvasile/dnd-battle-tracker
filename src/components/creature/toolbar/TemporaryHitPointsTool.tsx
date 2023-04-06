import React from "react";
import CreatureToolbarInput from "./CreatureToolbarInput";
import TempHpIcon from "../../icons/TempHpIcon";

type Props = {
  name: string;
  id: number;
  healthPoints?: number;
  addTemporaryHealthToCreature: (
    id: number,
    hitPoints: string | number,
  ) => void;
};

export default function TemporaryHitPointsTool({
  name,
  id,
  healthPoints,
  addTemporaryHealthToCreature,
}: Props) {
  return (
    <CreatureToolbarInput
      integer
      name="creature-toolbar-temphp"
      min={1}
      ariaLabel={`add/edit temp hp ${name}`}
      label="Temp HP"
      rightSubmit={(hitPoints: string | number) =>
        addTemporaryHealthToCreature(id, hitPoints)
      }
      rightControls={{
        rightEnabled: healthPoints !== undefined,
        rightTitle: "Add/Edit Temp HP",
        RightSubmitIcon: <TempHpIcon />,
      }}
      inputId={`temp-hp-${id}`}
    />
  );
}
