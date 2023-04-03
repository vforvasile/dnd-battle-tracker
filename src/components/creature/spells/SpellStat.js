import React from 'react';
import DescriptionHighlight from '../DescriptionHighlight';
import SpellList from './SpellList';

const getLevelPrefix = (level) => {
  switch (level) {
    case '1':
      return 'st';
    case '2':
      return 'nd';
    case '3':
      return 'rd';
    default:
      return 'th';
  }
};

export default function SpellStat({
  description,
  spellData,
}) {
  if (!spellData) {
    return (
      <div className="property-block">
        <h4>
          Spellcasting
          .
          {' '}
        </h4>

        {description && (
        <p>
          <DescriptionHighlight
            text={description}
          />
          {' '}
        </p>
        )}
      </div>
    );
  }
  // cut the text until the first spell
  const newDescription = description.split('prepared:');
  const newText = newDescription[0];

  const spellHeader = newText ? `${newText} prepared:` : '';

  return (
    <div>
      <div className="property-block">
        <h4>
          Spellcasting
          .
          {' '}
        </h4>

        {spellHeader && (
        <p>
          <DescriptionHighlight
            text={spellHeader}
          />
        </p>

        )}
      </div>
      <br />
      <p id="spell-level-text">
        {spellData.spells.map((spellThread) => {
          const levelName = spellThread.level === '0' ? 'Cantrips' : ` ${spellThread.level}${getLevelPrefix(spellThread.level)} level`;
          const suffix = spellThread.level === '0' ? '(at will):' : `(${spellThread.slots.length} slots):`;
          return (
            <span key={`Level-${spellThread.level}`}>
              <span>
                <b>{levelName}</b>
                {' '}
                {suffix}
                {' '}
              </span>
              {spellThread.knownSpells && (
              <SpellList
                knownSpells={spellThread.knownSpells}
              />
              )}

              <br />
            </span>

          );
        })}
      </p>

    </div>
  );
}
