import { ArmorClass } from "../components/types/creature";

export const getProficiencyBonus = (score: number) =>
  Math.max(Math.floor((score - 1) / 4), 0) + 2;

export const calculateAbilityModifier = (score: number) =>
  Math.floor((score - 10) / 2);

export const getModifierSign = (modifier: number) => (modifier > 0 ? "+" : "");

export const getAbilityWithSign = (base: number) => {
  const abilityModifier = calculateAbilityModifier(base);

  return `(${getModifierSign(abilityModifier)}${abilityModifier})`;
};

export const capitalizeWord = (word: string) =>
  word[0].toUpperCase() + word.slice(1);

export const beautifySnakeWord = (word?: string) => {
  if (!word) return "";

  return word
    .split("_")
    .map((line) => capitalizeWord(line))
    .join(" ");
};

export const getArmorClass = (data: ArmorClass[]) => {
  const [firstArmor] = data;
  if (!firstArmor?.value) return 0;
  return firstArmor.value;
};

export const DamageTypesObject = {
  acid: "🧪",
  bludgeoning: "🔨",
  cold: "❄️",
  force: "👊🏽",
  fire: "🔥",
  lightning: "⚡️",
  necrotic: "💀",
  piercing: "📌",
  poison: "🦠",
  psychic: "🔮",
  radiant: "🔆",
  slashing: "⚔️",
  thunder: "⛈️",
};

export type DamageType = keyof typeof DamageTypesObject;
