import { ApiCreatureInfo, CreatureType } from "./creature";

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

type RandomInitiativeParams = {
    initiative: number;
    index: number;
    syncMultipleInitiatives: boolean;
    apiData?: ApiCreatureInfo;
  };
  
  type CreateCreatureParams = {
    creatureIdCount: number;
    creatures: CreatureType[]
    creature: CreatureType;
    multiplier: number;
    name: string;
    initiative: number;
    index: number;
    syncMultipleInitiatives: boolean;
    apiData?: ApiCreatureInfo;
  }