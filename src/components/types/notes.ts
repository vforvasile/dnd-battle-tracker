import { ConditionDataType } from "./conditions";

export type NoteDataType= {
    text: string;
    appliedAtRound: number;
    appliedAtSeconds: number;
    id: number;
};


export type NoteOrCondition = NoteDataType | ConditionDataType;

export const isNoteType = (element: NoteOrCondition): element is NoteDataType => !('url' in element);

export const isConditionType = (element: NoteOrCondition): element is ConditionDataType => 'url' in element;