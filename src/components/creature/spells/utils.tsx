import React from 'react';
import Abjuration from '../../icons/spells/Abjuration';
import Conjuration from '../../icons/spells/Conjuration';
import Divination from '../../icons/spells/Divination';
import Enchantment from '../../icons/spells/Enchantment';
import Evocation from '../../icons/spells/Evocation';
import Illusion from '../../icons/spells/Illusion';
import Necromancy from '../../icons/spells/Necromancy';
import Transmutation from '../../icons/spells/Transmutation';
import { SchoolSpellType } from './types';

export const spellModalStyle = {
  content: {
    padding: 0,
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FDF1DC',
    borderRadius: '20px',
    boxShadow: '0px 1px 18px -4px rgba(117,74,50,0.98)',
    // WebkitOverflowScrolling: 'touch',
    overflowScrolling: 'touch',
    '-webkit-box-shadow': '0px 1px 18px -4px rgba(117,74,50,0.98)',
    '-moz-box-shadow': '0px 1px 18px -4px rgba(117,74,50,0.98)',
  },
};

export const spellModalStyleWeb = {
  content: {
    width: '55%',
    height: '55%',
  },
};

export const spellModalStyleMobile = {
  content: {
    width: '80%',
    height: '60%',
  },
};

export const getSpellLevelPrefix = (level: string) => {
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

export const spellIconBackground = (school: SchoolSpellType) => {
  switch (school) {
    case 'abjuration':
      return 'abjuration-background';
    case 'conjuration':
      return 'conjuration-background';
    case 'divination':
      return 'divination-background';
    case 'enchantment':
      return 'enchantment-background';
    case 'evocation':
      return 'evocation-background';
    case 'illusion':
      return 'illusion-background';
    case 'necromancy':
      return 'necromancy-background';
    case 'transmutation':
      return 'transmutation-background';
    default:
      return '';
  }
};

export const spellIcon = (school: SchoolSpellType) => {
  const loweredSchool = school.toLowerCase();
  switch (loweredSchool) {
    case 'abjuration':
      return <Abjuration />;
    case 'conjuration':
      return <Conjuration />;
    case 'divination':
      return <Divination />;
    case 'enchantment':
      return <Enchantment />;
    case 'evocation':
      return <Evocation />;
    case 'illusion':
      return <Illusion />;
    case 'necromancy':
      return <Necromancy />;
    case 'transmutation':
      return <Transmutation />;
    default:
      return null;
  }
};
