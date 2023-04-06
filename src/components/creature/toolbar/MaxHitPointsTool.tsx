import React from "react";
import CreatureToolbarInput from "./CreatureToolbarInput";
import AddHpIcon from "../../icons/AddHpIcon";

type Props = {
  name: string;
  id: number;
  addHitPointsToCreature: (id: number, hitPoints: string | number) => void;
};

export default function MaxHitPointsTool({
  name,
  id,
  addHitPointsToCreature,
}: Props) {
  return (
    <CreatureToolbarInput
      integer
      name="creature-toolbar-maxhp"
      min={1}
      ariaLabel={`add/edit max hp ${name}`}
      label="Max HP"
      rightSubmit={(hitPoints) => addHitPointsToCreature(id, hitPoints)}
      rightControls={{
        rightEnabled: true,
        rightTitle: "Add/Edit Max HP",
        RightSubmitIcon: <AddHpIcon />,
      }}
      inputId={`max-hp-${id}`}
    />
  );
}
