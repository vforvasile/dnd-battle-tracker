import { nanoid } from "nanoid";
import { BattleType } from "../components/types/battle";
import { CreatureType } from "../components/types/creature";
import { updateErrors, dismissErrors } from "./AppManager";

type ShareState = {
  variables: {
    battleinput: {
      battleId: string;
      round: number;
      creatures: Array<CreatureType>;
      expdate: number;
      activeCreature?: number | null;
    };
  };
};

export function share(
  state: BattleType,
  createBattle: (arg: ShareState) => void,
  updateBattle: (arg: ShareState) => void,
  date: Date,
) {
  if (!state.shareEnabled) {
    return state;
  }
  // remove additional data from creatures to fix share battle
  const newCreatures = state.creatures.map((creature) => {
    const { spellData, apiData, armorClass, ...rest } = creature;
    return rest;
  });

  const battleId = state.battleId || nanoid(11);

  const input: ShareState = {
    variables: {
      battleinput: {
        battleId,
        round: state.round,
        creatures: newCreatures,
        activeCreature: state.activeCreature,
        expdate: Math.floor(date.getTime() / 1000.0) + 86400,
      },
    },
  };

  const { battleCreated } = state;

  if (battleCreated) {
    updateBattle(input);
    return state;
  }

  createBattle(input);

  return { ...state, battleCreated: true, battleId };
}

export function handleShareError(
  state: BattleType,
  createError: boolean,
  updateError: boolean,
) {
  if (!createError && !updateError) return dismissErrors(state);

  const error = "Error sharing battle with players. Try toggling share button.";
  const stateWithErrors = updateErrors(state, error);

  if (createError) return { ...stateWithErrors, battleCreated: false };

  return stateWithErrors;
}
