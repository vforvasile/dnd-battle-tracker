import { SpellData } from "../creature/spells/types";
import { ConditionDataType } from "./conditions";
import { NoteDataType } from "./notes";

export interface Action {
  name: string;
  desc: string;
  attack_bonus: number;
  damage: Damage[];
  actions: any[];
}

export interface Damage {
  damage_type: ProficiencyClass;
  damage_dice: string;
}

export interface ProficiencyClass {
  index: string;
  name: string;
  url: string;
}

export interface ArmorClass {
  type: string;
  value: number;
  spell?: ProficiencyClass;
}

export interface Proficiency {
  value: number;
  proficiency: ProficiencyClass;
}

export interface Senses {
  passive_perception: number;
  blindsight: string;
  darkvision: string;
  tremorsense: string;
  truesight: string;
}

export interface SpecialAbility {
  name: string;
  desc: string;
  attack_bonus: number;
  damage: [
    {
      damage_type: {
        index: string;
        name: string;
        url: string;
      };
      damage_dice: string;
    },
  ];
  dc: {
    dc_type: {
      index: string;
      name: string;
      url: string;
    };
    dc_value: number;
    success_type: string;
  };

  spellcasting?: Spellcasting;
}

export type Spellcasting = {
  slots: { [key: string]: number };
  level: number;
  ability: ProficiencyClass;
  dc: number;
  modifier: number;
  components_required: string[];
  school: string;
  spells: SpellElement[];
};

export interface SpellElement {
  name: string;
  level: number;
  url: string;
  usage?: Usage;
  notes?: string;
}

export interface Usage {
  type: string;
  rest_types: any[];
}

export interface Speed {
  walk: string;
  burrow: string;
  climb: string;
  fly: string;
  swim: string;
}

export type LegendaryActionType = {
  name: string;
  desc: string;
  action_options: {
    desc: string;
    choose: number;
    type: string;
    from: any;
  };
  actions: [
    {
      action_name: string;
      count: number;
      type: "melee" | "ranged" | "ability" | "magic";
    },
  ];
  options: {
    desc: string;
    choose: number;
    type: string;
    from: any;
  };
  multiattack_type: string;
  attack_bonus: number;
  dc: {
    dc_type: {
      index: string;
      name: string;
      url: string;
    };
    dc_value: number;
    success_type: string;
  };
  attacks: [
    {
      name: string;
      dc: {
        dc_type: {
          index: string;
          name: string;
          url: string;
        };
        dc_value: number;
        success_type: string;
      };
      damage: {
        damage_type: {
          index: string;
          name: string;
          url: string;
        };
        damage_dice: string;
      };
    },
  ];
};

// generated type, could be incomplete
export type ApiCreatureInfo = {
  index: string;
  name: string;
  desc: string;
  size: string;
  type: string;
  subtype: string;
  alignment: string;
  armor_class: ArmorClass[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  speed: Speed;
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  proficiencies: Proficiency[];
  senses: Senses;
  languages: string;
  challenge_rating: number;
  xp: number;
  special_abilities: SpecialAbility[];
  actions: Action[];
  image: string;
  url: string;
  legendary_actions: LegendaryActionType[];
  condition_immunities: [
    {
      index: string;
      name: string;
      url: string;
    },
  ];
  damage_immunities: [string];
  damage_resistances: [string];
  damage_vulnerabilities: [string];
  // formatted spells
  spellData: SpellData;
};

// needs checking if it's complete
export type CreatureType = {
  name: string;
  id: number;
  alive: boolean;
  notes: NoteDataType[];
  locked: boolean;
  shared: boolean;
  hitPointsShared: boolean;
  conditions: ConditionDataType[];
  healthPoints?: number;
  maxHealthPoints?: number;
  temporaryHealthPoints?: number | null;
  initiative?: number;
  // added on top of original data
  armorClass?: number;
  apiData?: ApiCreatureInfo;
  spellData?: SpellData;
};

export type CreatureToAddType = CreatureType & {
  multiplier?: number;
  syncMultipleInitiatives?: boolean;
  number?: number;
};
