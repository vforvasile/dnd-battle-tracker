import React from 'react';
import CreatureToolbarInput from './CreatureToolbarInput';
import HealIcon from '../../icons/HealIcon';
import DamageIcon from '../../icons/DamageIcon';
import { hotkeys } from '../../../hotkeys/hotkeys';

type Props = {
  name: string;
  id: number;
  healthPoints: number;
  maxHealthPoints: number;
  temporaryHealthPoints: number;
  damageCreature: (id: number, damage: string | number) => void;
  healCreature: (id: number, health: string | number) => void;
}

export default function HealthPointsTool({
  name,
  id,
  healthPoints,
  maxHealthPoints,
  temporaryHealthPoints,
  damageCreature,
  healCreature,
}:Props) {
  const enableHealthTool = healthPoints !== undefined;
  const enableDamage = healthPoints > 0 || temporaryHealthPoints > 0;
  const enableHeal = healthPoints < maxHealthPoints;

  return enableHealthTool && (
    <CreatureToolbarInput
      integer
      min={1}
      ariaLabel={`damage or heal ${name}`}
      label="Damage/Heal"
      leftSubmit={(damage) => damageCreature(id, damage)}
      leftHotkey={hotkeys.damageCreature}
      leftControls={{
        leftTitle: 'Damage',
        leftEnabled: enableDamage,
        LeftSubmitIcon: <DamageIcon />,
      }}
      rightSubmit={(health) => healCreature(id, health)}
      rightHotkey={hotkeys.healCreature}
      rightControls={{
        rightTitle: 'Heal',
        rightEnabled: enableHeal,
        RightSubmitIcon: <HealIcon />,
      }}
      inputId={`damage-${id}`}
    />
  );
}
