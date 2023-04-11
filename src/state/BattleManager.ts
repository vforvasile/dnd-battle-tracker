import { resetCreature } from "./CreatureManager";
import packageJson from "../../package.json";
import { BattleType } from "../components/types/battle";
import { CreatureType } from "../components/types/creature";

function findCreatureIndex(creatures: CreatureType[], creature: CreatureType) {
  return creatures.findIndex(({ id }) => creature.id === id);
}

export const newBattleState: BattleType = {
  creatures: [],
  creatureIdCount: 0,
  activeCreature: null,
  focusedCreature: undefined,
  round: 0,
  ariaAnnouncements: [],
  errors: [],
  createCreatureErrors: {},
  battleId: undefined,
  battleCreated: false,
  shareEnabled: false,
  battleTrackerVersion: packageJson.version,
  rulesSearchOpened: false,
};

export function nextFocus(state: BattleType) {
  const { creatures, focusedCreature: currentFocusedCreature } = state;
  const creatureCount = creatures.length;
  if (creatureCount === 0) {
    return state;
  }

  let focusedCreature = 0;

  if (currentFocusedCreature !== undefined) {
    focusedCreature = currentFocusedCreature + 1;
  }

  if (focusedCreature === creatureCount) {
    focusedCreature = 0;
  }

  return { ...state, focusedCreature };
}

export function prevFocus(state: BattleType) {
  const { creatures, focusedCreature: currentFocusedCreature } = state;
  const creatureCount = creatures.length;
  if (creatureCount === 0) {
    return state;
  }

  let focusedCreature =
    typeof currentFocusedCreature === "number"
      ? currentFocusedCreature - 1
      : undefined;

  if (currentFocusedCreature === undefined || currentFocusedCreature === 0) {
    focusedCreature = creatureCount - 1;
  }

  return { ...state, focusedCreature };
}

export function setFocus(state: BattleType, creature: CreatureType) {
  let focusedCreature = findCreatureIndex(state.creatures, creature);
  if (focusedCreature === -1) {
    focusedCreature = 0;
  }
  return { ...state, focusedCreature };
}

export function resetBattle(state: BattleType) {
  const {
    creatures,
    ariaAnnouncements: currentAriaAnnouncements,
    battleId,
    shareEnabled,
    battleCreated,
  } = state;
  const lockedCreatures = creatures.filter((creature) => creature.locked);
  const creatureIdCount = lockedCreatures.length;
  const resetLockedCreatures = lockedCreatures.map((creature, id) =>
    resetCreature(id, creature),
  );
  const ariaAnnouncements = currentAriaAnnouncements.concat(["battle reset"]);
  return {
    ...newBattleState,
    battleCreated,
    shareEnabled,
    battleId,
    creatureIdCount,
    creatures: resetLockedCreatures,
    ariaAnnouncements,
  };
}

export function toggleSync(state: BattleType) {
  const { shareEnabled, ariaAnnouncements: currentAriaAnnouncements } = state;
  const announcement = shareEnabled ? "share disabled" : "share enabled";
  const ariaAnnouncements = currentAriaAnnouncements.concat([announcement]);
  return { ...state, shareEnabled: !shareEnabled, ariaAnnouncements };
}

export function toggleRulesSearch(state: BattleType) {
  const { rulesSearchOpened, ariaAnnouncements: currentAriaAnnouncements } =
    state;
  const announcement = rulesSearchOpened
    ? "rules search closed"
    : "rules search opened";
  const ariaAnnouncements = currentAriaAnnouncements.concat([announcement]);
  return { ...state, rulesSearchOpened: !rulesSearchOpened, ariaAnnouncements };
}
