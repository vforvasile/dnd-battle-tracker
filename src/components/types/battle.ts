import { CreatureType } from "./creature";

export type BattleType = {
  creatures: CreatureType[];
  creatureIdCount: number;
  activeCreature: number | null;
  round: number;
  ariaAnnouncements: string[];
  errors: string[];
  createCreatureErrors: { [key: string]: string };
  battleCreated: boolean;
  shareEnabled: boolean;
  battleTrackerVersion: string;
  rulesSearchOpened: boolean;
  focusedCreature?: number;
  battleId?: string;
};
