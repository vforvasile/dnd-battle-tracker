const getCreatureSpellData = (abilities) => {
  if (!abilities) return undefined;
  const data = abilities.find((ability) => ability.name === 'Spellcasting');
  if (!data || !data?.spellcasting) return undefined;

  const { spellcasting } = data;

  const apiSpells = spellcasting.spells ?? [];

  // for cantrips
  const spells = [{ level: '0', count: 100, slots: [] }];

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(spellcasting.slots)) {
    spells.push({
      level: key,
      count: value,
      slots: Array.from({ length: value }, (_, i) => ({ used: false, slotIndex: i })),
    });
  }

  const newSpells = spells.map((spell) => {
    const knownSpells = apiSpells.filter((s) => `${s.level}` === spell.level);
    return {
      ...spell,
      knownSpells,
    };
  });

  console.log('newSpells: ', newSpells);

  const spellData = {
    saveDC: spellcasting.dc,
    modifier: spellcasting.modifier,
    level: spellcasting.level,
    school: spellcasting.school,
    ability: spellcasting.ability.name,
    spells: newSpells,
  };

  return spellData;
};

export default getCreatureSpellData;