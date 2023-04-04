import React from 'react';
import Highlighter from 'react-highlight-words';
import { DamageTypesObject } from '../../util/characterSheet';

const HIT_CUT = 'Hit:';

function DescriptionHighlight({ text }) {
  const splitText = text.split(HIT_CUT);
  if (splitText.length === 0) {
    return <p>text</p>;
  }

  const attackRegexp = /\d+d\d+( \+ \d+)?/g;
  const attackWords = text.match(attackRegexp) ?? [];

  const damageRegexp = /\+\d+ to hit/g;
  const damageWords = text.match(damageRegexp) ?? [];

  const allWords = [...attackWords, ...damageWords];

  if (!allWords.length) return <p>{text}</p>;

  return splitText.map((item, index) => {
    const finalWords = allWords.filter((word) => item.includes(word));
    const textLine = index === 0 ? item : `${HIT_CUT}${item}`;

    const isAttackType = splitText.length === 2 && index === 0;

    const damageTypeRegexp = /\b\w+\b damage/g;
    const foundDamages = textLine.match(damageTypeRegexp) ?? [];

    const filterDamageTypes = foundDamages.map((currentDamage) => currentDamage.replace(' damage', '')).filter((thisDamage) => thisDamage.toLowerCase() in DamageTypesObject);
    const finalDamageTypesArr = Array.from(new Set(filterDamageTypes));

    const sentence = textLine.split(' ');

    const newSentence = sentence.map((word) => {
      if (finalDamageTypesArr.includes(word)) {
        return `${word} ${DamageTypesObject[word]}`;
      }
      return word;
    }).join(' ');

    const defaultClassName = 'highlight-text';

    return (

      <Highlighter
        key={textLine}
        searchWords={finalWords}
        autoEscape
        textToHighlight={newSentence}
        activeClassName={`${defaultClassName} ${isAttackType ? 'attack-highlight' : 'damage-highlight'}`}
        highlightClassName={`${defaultClassName} ${isAttackType ? 'attack-highlight' : 'damage-highlight'}`}
      />

    );
  });
}

export default DescriptionHighlight;
