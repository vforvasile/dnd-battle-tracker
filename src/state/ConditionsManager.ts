import {
  allConditions,
  conditionData,
  ConditionDataType,
  ConditionType,
} from "../components/types/conditions";
import { CreatureType } from "../components/types/creature";
import getSecondsElapsed from "./TimeManager";

function conditionExists(
  newConditionId: string,
  existingConditions: ConditionDataType[],
) {
  return (
    existingConditions.findIndex(
      (existingCondition) => existingCondition.id === newConditionId,
    ) > -1
  );
}

export function addCondition(
  conditionToAdd: ConditionType,
  creature: CreatureType,
  round: number,
): ConditionDataType[] {
  const { conditions: existingConditions, id: creatureId } = creature;
  const conditionDataToAdd = conditionData[conditionToAdd];

  if (!conditionDataToAdd) {
    return existingConditions;
  }

  const { text, url, id } = conditionDataToAdd;

  const newText = text as ConditionType;

  const newConditionId = `${id}-${creatureId}`;

  if (conditionExists(newConditionId, existingConditions)) {
    return existingConditions;
  }

  const newCondition: ConditionDataType = {
    text: newText,
    appliedAtRound: round,
    appliedAtSeconds: getSecondsElapsed(round),
    url,
    id: newConditionId,
  };
  return [...existingConditions, newCondition];
}

export function removeCondition(
  conditionToRemove: ConditionType,
  creature: CreatureType,
) {
  return creature.conditions.filter(({ text }) => text !== conditionToRemove);
}

export function getAvailableConditions(creature: CreatureType) {
  return Object.values(allConditions).filter((condition) => {
    const activeConditionIndex = creature.conditions.findIndex(
      (activeCondition) => activeCondition.text === condition,
    );
    return activeConditionIndex === -1;
  });
}
