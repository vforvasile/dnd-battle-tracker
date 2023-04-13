import { CreatureSpellType, SpellData, SpellSlotType } from "../components/creature/spells/types";
import { Spellcasting } from "../components/types/creature";

/* eslint-disable max-len */
export const getCreatureSpellData = (spellcasting: Spellcasting):SpellData => {

  const apiSpells = spellcasting.spells ?? [];

  const spells = [];

  for (const [key, value] of Object.entries(spellcasting.slots)) {
    spells.push({
      level: key,
      count: value,
      slots: Array.from({ length: value }, (_, i) => ({ used: false, slotIndex: i })),
    });
  }
  // for cantrips, add level 0
  const spellsPreMap = [{ level: '0', count: 100, slots: [] }, ...spells];

  const newSpells: CreatureSpellType[] = spellsPreMap.map((spell) => {
    const knownSpells = apiSpells.filter((s) => `${s.level}` === spell.level);
    return {
      ...spell,
      knownSpells,
    };
  });

  const spellData = {
    saveDC: spellcasting.dc,
    modifier: spellcasting.modifier,
    level: spellcasting.level,
    school: spellcasting.school,
    ability: spellcasting.ability?.name ?? '',
    spells: newSpells,
  };

  return spellData;
};

type FuncParamType = {
 slotIndex: number; value: boolean; 
}

type FuncParamType2 = {
  slotIndex: number; value: boolean; level: string; 
 }

export const changeSpellSlot = (slots:SpellSlotType[], { slotIndex, value }:FuncParamType) => slots.map((currentSlot) => {
  if (currentSlot.slotIndex === slotIndex) {
    return {
      ...currentSlot,
      used: value,
    };
  }
  return currentSlot;
});

export const findAndChangeSpellSlot = (spells:CreatureSpellType[], { level, slotIndex, value }: FuncParamType2) => spells.map((currentLevel) => {
  if (currentLevel.level === level) {
    return {
      ...currentLevel,
      slots: changeSpellSlot(currentLevel.slots, { slotIndex, value }),
    };
  }
  return currentLevel;
});

export const sortSpells = (spells:CreatureSpellType[]) => [...spells].sort((a, b) =>  parseFloat(a.level) - parseFloat(b.level));

export const getRemainingSpellSlots = (spells: CreatureSpellType[]) => spells.reduce((acc, spell) => {
  const remaining = spell.slots.filter((slot) => !slot.used).length;
  return acc + remaining;
}, 0);
