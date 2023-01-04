export const getProficiencyBonus = (score) => Math.max(Math.floor((score - 1) / 4), 0) + 2;

export const calculateAbilityModifier = (score) => Math.floor((score - 10) / 2);

export const getModifierSign = (modifier) => {
  if (modifier < 0) {
    return '-';
  }
  if (modifier > 0) {
    return '+';
  }
  return 0;
};
