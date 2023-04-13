/* eslint-disable max-len */
import { createCreature, validateCreature } from "./CreatureManager";
import { sortByInitiative } from "./InitiativeManager";
import { addError } from "./AppManager";
import rollDice from "../util/rollDice";
import { calculateAbilityModifier } from "../util/characterSheet";
import { ApiCreatureInfo, CreatureToAddType, CreatureType } from "../components/types/creature";
import { BattleType } from "../components/types/battle";
import { objKeys } from "../util/util";

type RandomInitiativeParams = {
  initiative: number;
  index: number;
  syncMultipleInitiatives?: boolean;
  apiData?: ApiCreatureInfo;
};



function findCreatureIndex(creatures: CreatureType[], creature: CreatureType) {
  return creatures.findIndex(({ id }) => creature.id === id);
}
// calculate with DEX as well
function randomizeInitiative({
  initiative,
  index,
  syncMultipleInitiatives,
  apiData,
}: RandomInitiativeParams) {
  // keep only first input initiative, randomize for others
  if (index === 0) {
    return initiative;
  }
  if (syncMultipleInitiatives) {
    return initiative;
  }
  // for multiple random initiatives, use DEX modifier to apply to result
  const dexterityModifier = apiData?.dexterity
    ? calculateAbilityModifier(apiData.dexterity)
    : 0;
  return rollDice(20) + dexterityModifier;
}

export function removeCreature(state: BattleType, creatureId: number) {
  if (state.creatures === undefined) {
    return state;
  }

  const creatures = state.creatures.filter(({ id }) => creatureId !== id);

  let activeCreature;

  if (creatures.length === 0) {
    activeCreature = undefined;
  } else if (state.activeCreature) {
    const currentlyActiveCreature = state.creatures[state.activeCreature];
    activeCreature =
      currentlyActiveCreature.id === creatureId
        ? state.activeCreature
        : findCreatureIndex(creatures, currentlyActiveCreature);
  } else {
    activeCreature = state.activeCreature;
  }

  const ariaAnnouncement = "creature removed from battle";
  const ariaAnnouncements = state.ariaAnnouncements.concat([ariaAnnouncement]);
  return {
    ...state,
    creatures,
    activeCreature,
    ariaAnnouncements,
  };
}

type CreateCreatureParams = {
  creatureIdCount: number;
  creatures: CreatureType[];
  creature: CreatureType & { number?: number};
  multiplier: number;
  syncMultipleInitiatives?: boolean;
  apiData?: ApiCreatureInfo;
};

// eslint-disable-next-line max-len
function createCreatures({
  creatureIdCount,
  creatures,
  creature,
  multiplier,
  syncMultipleInitiatives,
  apiData,
}: CreateCreatureParams) {
  if (multiplier <= 1) {
    return [createCreature(creatureIdCount, creature)];
  }

  const groupRegex = new RegExp(`^${creature.name.toLowerCase()}\\s*#(\\d*)$`);
  const groupMatch = (_:any) => _.name.toLowerCase().match(groupRegex);

  const groupIndexes = creatures
    .filter((_) => groupMatch(_) !== null)
    .map((_) => parseInt(groupMatch(_)[1], 10))
    .sort((a, b) => a - b);

  const groupSize = groupIndexes.length;
  const groupOffset = groupSize > 0 ? groupIndexes[groupSize - 1] : 0;

  return Array(multiplier)
    .fill(null)
    .map((_, i) => {
      const { name, initiative } = creature;
      const number = i + 1 + groupOffset;
      // don't change empty inputs
      const newInitiative = initiative
        ? randomizeInitiative({
            initiative,
            index: i,
            syncMultipleInitiatives,
            apiData,
          })
        : undefined;
      return createCreature(creatureIdCount + i, {
        ...creature,
        name,
        number,
        initiative: newInitiative,
      });
    });
}

export function addCreature(state: BattleType, creature: CreatureToAddType) {
  const { multiplier, syncMultipleInitiatives, ...creatureStats } = creature;
  const creatureMultiplier = multiplier || 1;
  const { name, initiative, healthPoints } = creatureStats;
  const createCreatureErrors = validateCreature(
    name,
    initiative,
    healthPoints,
    multiplier,
  );

  if (createCreatureErrors) {
    const createCreatureErrorMessages = objKeys(createCreatureErrors)
      .filter((error) => createCreatureErrors[error])
      .map((error) => createCreatureErrors[error])
      .join(". ");

    const ariaAnnouncements = state.ariaAnnouncements.concat(
      `Failed to create creature. ${createCreatureErrorMessages}`,
    );
    const errors = addError(
      state,
      "Failed to create creature. Create creature form is invalid.",
    );
    return {
      ...state,
      ariaAnnouncements,
      errors,
      createCreatureErrors,
    };
  }

  const newCreatures = createCreatures({
    creatureIdCount: state.creatureIdCount,
    creatures: state.creatures,
    creature: creatureStats,
    multiplier: creatureMultiplier,
    apiData: creatureStats.apiData,
    syncMultipleInitiatives
  });

  const {
    sortedCreatures: creatures,
    currentlyActiveCreature: activeCreature,
  } = sortByInitiative(
    [...state.creatures, ...newCreatures],
    state.activeCreature as number,
    state.round,
  );

  const creatureIdCount = state.creatureIdCount + creatureMultiplier;

  const ariaAnnouncement =
    newCreatures.length > 1
      ? "creatures added"
      : `${newCreatures[0].name} added`;
  const ariaAnnouncements = state.ariaAnnouncements.concat([ariaAnnouncement]);

  return {
    ...state,
    creatures,
    creatureIdCount,
    activeCreature,
    focusedCreature: undefined,
    ariaAnnouncements,
    createCreatureErrors: {},
    errors: [],
  };
}

export function getCreatureList(state: BattleType, playerSession = false) {
  if (!playerSession) {
    const { creatures } = state;
    return [creatures, creatures.length];
  }

  const sharedCreatures = state.creatures.filter(({ shared }) => shared);
  return [sharedCreatures, sharedCreatures.length];
}
