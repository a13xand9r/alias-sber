import { actions, initialState } from '../store/store'
import { PlasmaAppProps, Action } from '@sberdevices/plasma-temple';

export type AssistantProps = PlasmaAppProps['assistantParams'];
export type AppHeaderProps = PlasmaAppProps['header'];

export interface Start {

}

export interface Play {

}

export interface Settings {

}

export interface Commands {

}

export interface Result {

}

export interface Questions {
    id: string;
}

// Тип описывает состояние экранов приложения
export interface PageStateType {
    start: Start,
    play: Play,
    settings: Settings,
    teams: null,
    roundResult: null
    rules: null
    teamScore: null
    questions: Questions
}

export enum ActionId {
    Facts = 'Facts',
    History = 'History',
    Horror = 'Horror',
    Question = 'Question'
}

// Тип описывает параметры экранов с которыми они открываются при использовании pushScreen
export interface PageParamsType {
    film: { id: string };
    main: { };
    questions: { params: any };
}

// Экшены взаимодействия с ассистентом
export enum ActionType {
    WORDS= 'WORDS',

}

type ActionPayload<T extends ActionType, P extends Record<string, unknown> = any> = {
    type: T;
    payload: P extends void ? never : P;
};

export type AssistantDataAction =
    | Action<ActionPayload<ActionType.WORDS>>

export type StateType = typeof initialState

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>

export type CharacterType = 'sber' | 'joy' | 'eva'

export type Team = {
    name: string
    id: string
    score: number
}

export type RoundWord = {
    word: string
    isAnswered: boolean
}