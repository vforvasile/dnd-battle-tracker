export type KnownSpell = {
  name: string;
  level: number;
  url: string;
};

export type SchoolSpellType =
  | "evocation"
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "illusion"
  | "necromancy"
  | "transmutation";

export type School = {
  index: SchoolSpellType;
  name: string;
  url: string;
};

export type Damage = {
  damage_at_character_level: { [key: string]: string };
  damage_type: School;
};

export type Dc = {
  dc_success: string;
  dc_type: School;
};

export interface AreaOfEffect {
  type: "sphere" | "cone" | "cylinder" | "line" | "cube";
  size: number;
}

// Generated type, could be incomplete
export type ApiSpell = {
  index: string;
  name: string;
  url: string;
  attack_type: string;
  casting_time: string;
  classes: School[];
  components: string[];
  concentration: boolean;
  damage: Damage;
  dc: Dc;
  desc: string[];
  duration: string;
  higher_level: any[];
  level: number;
  range: string;
  ritual: boolean;
  school: School;
  subclasses: School[];
  area_of_effect: AreaOfEffect;
};

export type SpellSlotType = {
  slotIndex: number;
  used: boolean;
};

export type CreatureSpellType = {
  slots: SpellSlotType[];
  knownSpells: KnownSpell[];
  level: string;
  count: number;
};

export type SpellData = {
  saveDC: number;
  modifier: number;
  level: number;
  school: string;
  ability: string;
  spells: CreatureSpellType[];
};
