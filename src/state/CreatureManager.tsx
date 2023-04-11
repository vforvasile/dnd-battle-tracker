/* eslint-disable max-len */
import { SpellData } from "../components/creature/spells/types";
import { BattleType } from "../components/types/battle";
import { allConditions, ConditionType } from "../components/types/conditions";
import { CreatureType } from "../components/types/creature";
import { NoteOrCondition } from "../components/types/notes";
import { findAndChangeSpellSlot, sortSpells } from "../util/spells";
import { isNumber, notEmpty } from "../util/util";
import { addCondition, removeCondition } from "./ConditionsManager";
import getSecondsElapsed from "./TimeManager";

type CurrentSpell = {
  level: string;
  slotIndex: number;
  value: boolean;
};

type SpellSlotChange = {
  level: string;
  slotNumber: number;
};

function findCreature(creatures: CreatureType[], creatureId: number) {
  return creatures.find(({ id }) => creatureId === id);
}

function updateCreature(
  state: BattleType,
  id: number,
  updates: Partial<CreatureType>,
  announcement: string,
) {
  const newCreatures = [...state.creatures];
  const creatureIndex = newCreatures.findIndex(
    (creature) => creature.id === id,
  );
  const existingCreature = newCreatures[creatureIndex];
  newCreatures[creatureIndex] = { ...existingCreature, ...updates };

  const ariaAnnouncement = announcement ? [announcement] : [];
  const ariaAnnouncements = state.ariaAnnouncements.concat(ariaAnnouncement);

  return { ...state, creatures: newCreatures, ariaAnnouncements };
}

export function killCreature(state: BattleType, creatureId: number) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const healthPoints = creature.healthPoints === undefined ? undefined : 0;
  const ariaAnnouncement = `${creature.name} killed/made unconscious`;
  const conditionToAdd = allConditions["Unconscious"] as ConditionType;
  const newConditions = addCondition(conditionToAdd, creature, state.round);
  const updates: Partial<CreatureType> = {
    alive: false,
    healthPoints,
    conditions: newConditions,
  };
  return updateCreature(state, creatureId, { ...updates }, ariaAnnouncement);
}

export function updateCreatureSpells(
  state: BattleType,
  creatureId: number,
  currentSpell: CurrentSpell,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  const ariaAnnouncement = `Spells changed for ${creature.name}`;
  const { spellData } = creature;

  if (!spellData) return state;

  const newSpells = findAndChangeSpellSlot(spellData.spells, currentSpell);

  const newData = { ...spellData, spells: newSpells };

  return updateCreature(
    state,
    creatureId,
    { spellData: newData },
    ariaAnnouncement,
  );
}

export function resetSpells(state: BattleType, creatureId: number) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  const ariaAnnouncement = `Spells changed for ${creature.name}`;
  const { spellData } = creature;

  if (!spellData) return state;

  const newSpells = spellData.spells.map((spell) => {
    const slots = spell.slots.map((slot) => ({ ...slot, used: false }));
    return { ...spell, slots };
  });

  const newData = { ...spellData, spells: newSpells };

  return updateCreature(
    state,
    creatureId,
    { spellData: newData },
    ariaAnnouncement,
  );
}

export function addSpellSlot(
  state: BattleType,
  creatureId: number,
  spellLevel: string,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  const ariaAnnouncement = `Spells slot added for ${creature.name}`;

  const { spellData } = creature;
  if (!spellData) return state;

  const newSpells = spellData.spells.map((spell) => {
    if (spell.level === spellLevel) {
      const { slots } = spell;
      return {
        ...spell,
        slots: [...slots, { used: false, slotIndex: slots.length + 1 }],
      };
    }
    return spell;
  });

  const newData = { ...spellData, spells: newSpells };

  return updateCreature(
    state,
    creatureId,
    { spellData: newData },
    ariaAnnouncement,
  );
}

export function removeSpellSlot(
  state: BattleType,
  creatureId: number,
  spellLevel: string,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  const ariaAnnouncement = `Spells slot removed for ${creature.name}`;
  const { spellData } = creature;
  if (!spellData) return state;

  const newSpells = spellData.spells
    .map((spell) => {
      if (spell.level === spellLevel) {
        const { slots } = spell;
        const updatedSlots = slots.filter(
          (_, index) => slots.length - index !== 1,
        );
        if (updatedSlots.length === 0) return null;
        return { ...spell, slots: updatedSlots };
      }
      return spell;
    })
    .filter(notEmpty);

  const newData = { ...spellData, spells: newSpells };

  return updateCreature(
    state,
    creatureId,
    { spellData: newData },
    ariaAnnouncement,
  );
}

export function createSpellLevel(
  state: BattleType,
  creatureId: number,
  spellChange: SpellSlotChange,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const ariaAnnouncement = `Spell level added for ${creature.name}`;
  const { level, slotNumber } = spellChange;
  const stringLevel = `${level}`;

  // if the creature doesn't have spell data, create it
  if (!creature.spellData) {
    const newData: SpellData = {
      // TODO: make this into a function
      spells: [
        {
          slots: Array.from({ length: slotNumber }, (_, index) => ({
            used: false,
            slotIndex: index,
          })),
          count: slotNumber,
          level: stringLevel,
          knownSpells: [],
        },
      ],
    };

    return updateCreature(
      state,
      creatureId,
      { spellData: newData },
      ariaAnnouncement,
    );
  }
  const { spellData } = creature;
  // update
  // update slots for existing spell level
  if (spellData.spells.some((spell) => spell.level === stringLevel)) {
    const newSpells = spellData.spells
      .map((spell) => {
        if (spell.level === stringLevel) {
          const { slots } = spell;
          const newSlots = Array.from({ length: slotNumber }, (_, index) => ({
            used: false,
            slotIndex: slots.length + index,
          }));
          const updatedSlots = [...slots, ...newSlots];
          return { ...spell, slots: updatedSlots };
        }
        return spell;
      })
      .filter(notEmpty);

    const newData = { ...spellData, spells: sortSpells(newSpells) };

    return updateCreature(
      state,
      creatureId,
      { spellData: newData },
      ariaAnnouncement,
    );
  }
  // if the creature does have spell data, add the new spell level
  // TODO: make this into a function
  const newSpells = [
    ...spellData.spells,
    {
      slots: Array.from({ length: slotNumber }, (_, index) => ({
        used: false,
        slotIndex: index,
      })),
      count: slotNumber,
      level: stringLevel,
      knownSpells: [],
    },
  ];

  const newData = { ...spellData, spells: sortSpells(newSpells) };

  return updateCreature(
    state,
    creatureId,
    { spellData: newData },
    ariaAnnouncement,
  );
}

export function stabalizeCreature(state: BattleType, creatureId: number) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const ariaAnnouncement = `${creature.name} stabalized`;
  return updateCreature(state, creatureId, { alive: true }, ariaAnnouncement);
}

export function damageCreature(
  state: BattleType,
  creatureId: number,
  damage: number,
) {
  if (damage < 0) {
    return state;
  }

  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  let { healthPoints, temporaryHealthPoints } = creature;

  if (!healthPoints && !temporaryHealthPoints) {
    return state;
  }

  let remainingDamage = damage;
  if (typeof temporaryHealthPoints === "number") {
    temporaryHealthPoints -= damage;
    remainingDamage = 0;
    if (temporaryHealthPoints < 0) {
      remainingDamage = Math.abs(temporaryHealthPoints);
      temporaryHealthPoints = 0;
    }
  }
  let { alive, conditions } = creature;
  if (isNumber(healthPoints)) {
    healthPoints -= remainingDamage;

    if (healthPoints <= 0) {
      healthPoints = 0;
      alive = false;
      conditions = addCondition(
        allConditions.Unconscious as ConditionType,
        creature,
        state.round,
      );
    }
  }

  const temporaryHealthPointsAnnouncement =
    temporaryHealthPoints !== null
      ? `${creature.name}'s temporary health is ${temporaryHealthPoints}. `
      : "";
  const ariaAnnouncement = `damaged ${creature.name} by ${damage}. ${temporaryHealthPointsAnnouncement}${creature.name}'s health is ${healthPoints}`;
  return updateCreature(
    state,
    creatureId,
    {
      alive,
      healthPoints,
      temporaryHealthPoints,
      conditions,
    },
    ariaAnnouncement,
  );
}

export function healCreature(
  state: BattleType,
  creatureId: number,
  health: number,
) {
  if (health < 0) {
    return state;
  }

  const creature = findCreature(state.creatures, creatureId);

  if (!creature) return state;

  if (!isNumber(creature.healthPoints)) {
    return state;
  }
  const { healthPoints: healthFromCreature } = creature;

  let healthPoints = healthFromCreature + health;
  if (
    isNumber(creature.maxHealthPoints) &&
    healthPoints > creature.maxHealthPoints
  ) {
    healthPoints = creature.maxHealthPoints;
  }

  let { alive, conditions } = creature;
  if (healthFromCreature === 0 && healthPoints > 0) {
    alive = true;
    conditions = removeCondition(
      allConditions.Unconscious as ConditionType,
      creature,
    );
  }

  const ariaAnnouncement = `healed ${creature.name} by ${health}. ${creature.name}'s health is ${healthPoints}`;
  return updateCreature(
    state,
    creatureId,
    { alive, healthPoints, conditions },
    ariaAnnouncement,
  );
}

export function getRawName(name: string) {
  return name.replace(/[0-9]|#/g, "").trim();
}

export function createCreature(
  creatureId: number,
  creature: CreatureType & { number: number },
) {
  const {
    armorClass,
    name,
    number,
    initiative,
    healthPoints,
    apiData,
    spellData,
  } = creature;
  const groupedName = number ? `${name} #${number}` : name;
  const finalCreature: CreatureType = {
    name: groupedName,
    initiative,
    healthPoints,
    maxHealthPoints: healthPoints,
    temporaryHealthPoints: null,
    id: creatureId,
    alive: true,
    conditions: [],
    notes: [],
    locked: false,
    shared: true,
    hitPointsShared: true,
  };

  if (creature.armorClass) {
    finalCreature.armorClass = armorClass;
  }
  if (apiData) {
    finalCreature.apiData = apiData;
  }
  if (spellData) {
    finalCreature.spellData = spellData;
  }
  return finalCreature;
}

export function validateCreature(
  name: string,
  initiative: number,
  healthPoints: number,
  multiplier: number,
) {
  const nameError = name === "";
  const initiativeError = initiative !== undefined && Number.isNaN(initiative);
  const healthError = healthPoints <= 0;
  const multiplierError = multiplier <= 0 || multiplier > 50;

  if (nameError || initiativeError || healthError || multiplierError) {
    return {
      nameError: nameError ? "Name must be provided." : false,
      initiativeError: initiativeError ? "Initiative must be a number." : false,
      healthError: healthError ? "Health must be greater than 0." : false,
      multiplierError: multiplierError
        ? "Multiplier must be greater than 0 and less than 50."
        : false,
    };
  }

  return undefined;
}

export function addNoteToCreature(
  state: BattleType,
  creatureId: number,
  text: string,
  isCondition: boolean,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  if (isCondition) {
    const ariaAnnouncement = `${text} condition added to ${creature.name}`;
    const condition = text as ConditionType;
    const conditions = addCondition(condition, creature, state.round);
    return updateCreature(state, creatureId, { conditions }, ariaAnnouncement);
  }

  const noteIds = creature.notes.map(({ id }) => id);
  const largestId = noteIds.sort((id1, id2) => id2 - id1)[0];
  const nextId = largestId === undefined ? 0 : largestId + 1;

  const note = {
    text,
    appliedAtRound: state.round,
    appliedAtSeconds: getSecondsElapsed(state.round),
    id: nextId,
  };
  const notes = [...creature.notes, note];
  const ariaAnnouncement = `note added to ${creature.name}`;
  return updateCreature(state, creatureId, { notes }, ariaAnnouncement);
}

export function updateNoteForCreature(
  state: BattleType,
  creatureId: number,
  noteId: number,
  text: string,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const existingNote = creature.notes.find(({ id }) => id === noteId);
  if (!existingNote) return state;
  const newNote = {
    ...existingNote,
    text,
  };
  const notes = creature.notes.map((note) => {
    if (note.id === noteId) return newNote;
    return note;
  });
  const ariaAnnouncement = `note updated for ${creature.name}`;
  return updateCreature(state, creatureId, { notes }, ariaAnnouncement);
}

export function removeNoteFromCreature(
  state: BattleType,
  creatureId: number,
  note: NoteOrCondition,
  isCondition: boolean,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  if (isCondition) {
    const conditions = removeCondition(note.text as ConditionType, creature);
    const ariaAnnouncement = `${note.text} condition removed from ${creature.name}`;
    return updateCreature(state, creatureId, { conditions }, ariaAnnouncement);
  }

  const notes = creature.notes.filter(({ id }) => id !== note.id);
  const ariaAnnouncement = `note removed from ${creature.name}`;
  return updateCreature(state, creatureId, { notes }, ariaAnnouncement);
}

export function addHitPointsToCreature(
  state: BattleType,
  creatureId: number,
  hitPoints: number,
) {
  if (hitPoints <= 0) {
    return state;
  }

  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const { alive, healthPoints, maxHealthPoints, name } = creature;

  let newHitPoints;

  if (!alive) {
    newHitPoints = 0;
  } else if (isNumber(maxHealthPoints) && hitPoints > maxHealthPoints) {
    const difference = hitPoints - maxHealthPoints;
    if (isNumber(healthPoints)) {
      newHitPoints = healthPoints + difference;
    }
  } else if (isNumber(healthPoints) && hitPoints > healthPoints) {
    newHitPoints = healthPoints;
  } else {
    newHitPoints = hitPoints;
  }

  const ariaAnnouncement = `${name}'s hp is ${newHitPoints}, max hp is ${hitPoints}`;
  return updateCreature(
    state,
    creatureId,
    { healthPoints: newHitPoints, maxHealthPoints: hitPoints },
    ariaAnnouncement,
  );
}

export function addTemporaryHealthToCreature(
  state: BattleType,
  creatureId: number,
  health: number,
) {
  if (health < 0) {
    return state;
  }

  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const ariaAnnouncement = `${creature.name} has ${health} temporary health points`;
  return updateCreature(
    state,
    creatureId,
    { temporaryHealthPoints: health },
    ariaAnnouncement,
  );
}

export function addInitiativeToCreature(
  state: BattleType,
  creatureId: number,
  initiative: number,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  if (creature.initiative !== undefined) {
    return state;
  }

  const ariaAnnouncement = `${creature.name}'s initiative is ${initiative}`;
  return updateCreature(state, creatureId, { initiative }, ariaAnnouncement);
}

export function toggleCreatureLock(state: BattleType, creatureId: number) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  const newState = creature.locked ? "unlocked" : "locked";
  const ariaAnnouncement = `${creature.name} is ${newState}`;
  return updateCreature(
    state,
    creatureId,
    { locked: !creature.locked },
    ariaAnnouncement,
  );
}

export function toggleCreatureShare(state: BattleType, creatureId: number) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;
  const newState = creature.shared ? "not shared" : "shared";
  const ariaAnnouncement = `${creature.name} is ${newState}`;
  return updateCreature(
    state,
    creatureId,
    { shared: !creature.shared },
    ariaAnnouncement,
  );
}

export function toggleCreatureHitPointsShare(
  state: BattleType,
  creatureId: number,
) {
  const creature = findCreature(state.creatures, creatureId);
  if (!creature) return state;

  const newState = creature.hitPointsShared ? "not shared" : "shared";
  const ariaAnnouncement = `${creature.name}'s hit points are ${newState}`;
  return updateCreature(
    state,
    creatureId,
    { hitPointsShared: !creature.hitPointsShared },
    ariaAnnouncement,
  );
}

export function resetCreature(id: number, creature: CreatureType) {
  const notes = creature.notes.map((note) => ({
    ...note,
    appliedAtRound: 0,
    appliedAtSeconds: 0,
  }));
  const conditions = creature.conditions.map((condition) => ({
    ...condition,
    appliedAtRound: 0,
    appliedAtSeconds: 0,
  }));
  return {
    ...creature,
    id,
    initiative: undefined,
    notes,
    conditions,
  };
}

export function isCreatureStable(creature: CreatureType) {
  const { alive, healthPoints, conditions } = creature;

  if (!alive || (isNumber(healthPoints) && healthPoints > 0)) {
    return false;
  }

  const isUnconscious =
    conditions.findIndex(({ text }) => text === allConditions.Unconscious) > -1;

  return healthPoints === 0 || isUnconscious;
}
