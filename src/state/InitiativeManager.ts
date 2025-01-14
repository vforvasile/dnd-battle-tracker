import { BattleType } from "../components/types/battle";
import { CreatureType } from "../components/types/creature";
import { isNumber } from "../util/util";
import { addError } from "./AppManager";

function findCreatureIndex(creatures: CreatureType[], creature: CreatureType) {
  return creatures.findIndex(({ id }) => creature.id === id);
}

function sortCreatures(creatures: CreatureType[]) {
  return creatures.sort(
    (creatureA, creatureB) =>
      Number(creatureB.initiative) - Number(creatureA.initiative),
  );
}

export function sortByInitiative(
  creatures: CreatureType[],
  activeCreature: number,
  round: number,
) {
  const initialActiveCreature = creatures[activeCreature];
  const sortedCreatures = sortCreatures(creatures);
  const currentlyActiveCreature =
    round > 0
      ? findCreatureIndex(sortedCreatures, initialActiveCreature)
      : activeCreature;
  return { sortedCreatures, currentlyActiveCreature };
}

function getNextActiveCreatureAndRound(
  currentActiveCreature: number,
  creatureCount: number,
  currentRound: number,
) {
  if (currentActiveCreature === null) {
    return [0, 1];
  }

  const nextActiveCreature = currentActiveCreature + 1;

  if (nextActiveCreature === creatureCount) {
    return [0, currentRound + 1];
  }

  return [nextActiveCreature, currentRound];
}

export function nextInitiative(state: BattleType) {
  if (state.creatures.length === 0) {
    return state;
  }

  const creaturesWithoutInitiative = state.creatures.filter(
    (creature) => creature.initiative === undefined,
  );
  if (creaturesWithoutInitiative.length > 0) {
    const { name } = creaturesWithoutInitiative[0];
    const ariaAnnouncements = state.ariaAnnouncements.concat(
      `Cannot continue battle. ${name} has no initiative.`,
    );
    const errors = addError(
      { ...state, errors: [] },
      `Cannot continue battle; ${name} has no initiative.`,
    );
    return { ...state, ariaAnnouncements, errors };
  }

  const { sortedCreatures, currentlyActiveCreature } = sortByInitiative(
    state.creatures,
    // forgive me for I have sinned
    // ?? 0 breaks the tests
    state.activeCreature as number,
    state.round,
  );

  const [activeCreature, round] = getNextActiveCreatureAndRound(
    currentlyActiveCreature,
    state.creatures.length,
    state.round,
  );

  const { name, alive } = state.creatures[activeCreature];
  let ariaAnnouncement = `its ${name}'s go`;

  if (!alive) {
    ariaAnnouncement = `${ariaAnnouncement}. ${name} is dead/unconscious`;
  }
  const ariaAnnouncements = state.ariaAnnouncements.concat([ariaAnnouncement]);

  return {
    ...state,
    creatures: sortedCreatures,
    round,
    activeCreature,
    focusedCreature: activeCreature,
    ariaAnnouncements,
    errors: [],
  };
}

function findPreviousSharedCreature(
  startingRound:number,
  creatures: CreatureType[],
  startingIndex:number,
  currentIndex = startingIndex,
):any {
  const { name, shared, id } = creatures[currentIndex];

  if (shared) {
    return [startingRound, name, id];
  }

  const lastIndex = creatures.length - 1;
  const previousIndex = currentIndex - 1;
  const wrapIndex = previousIndex < 0;
  const previousCreatureIndex = wrapIndex ? lastIndex : previousIndex;

  if (previousCreatureIndex === startingIndex) {
    return [0, "", null];
  }

  const round = wrapIndex ? startingRound - 1 : startingRound;

  if (round === 0) {
    return [0, "", null];
  }

  return findPreviousSharedCreature(
    round,
    creatures,
    startingIndex,
    previousCreatureIndex,
  );
}

export function getInitiative(state:BattleType, playerSession:boolean) {
  const { creatures, round, activeCreature } = state;
  if (creatures.length === 0 || round === 0) {
    return [0, "", null];
  }

  if(!isNumber(activeCreature)) return [0, "", null]

  if (playerSession) {
    return findPreviousSharedCreature(round, creatures, activeCreature);
  }


  const { name, id } = creatures[activeCreature];

  return [round, name, id];
}
