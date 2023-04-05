import React from 'react';
import DescriptionHighlight from '../DescriptionHighlight';
import SpellList from './SpellList';
import { SpellData } from './types';
import { getSpellLevelPrefix } from './utils';

type Props = {
  description: string;
  spellData: SpellData;
}

export default function SpellStat({
  description,
  spellData,
}:Props) {
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
          const levelName = spellThread.level === '0' ? 'Cantrips' : ` ${spellThread.level}${getSpellLevelPrefix(spellThread.level)} level`;
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
