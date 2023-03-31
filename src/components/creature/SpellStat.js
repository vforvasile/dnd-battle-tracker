import React from 'react';
import DescriptionHighlight from './DescriptionHighlight';

export default function SpellStat({
  description,
  spells,
}) {
  // cut the text until the first spell
  const newDescription = description.split('prepared:');
  const newText = newDescription[0];

  const spellHeader = newText ? `${newText} prepared:` : '';
  console.log('new', newDescription);

  return (
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
        {' '}
      </p>
      )}
    </div>
  );
}
