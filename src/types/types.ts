import { actions, initialState } from '../store/store'
import { PlasmaAppProps, Action } from '@sberdevices/plasma-temple';

export type AssistantProps = PlasmaAppProps['assistantParams'];
export type AppHeaderProps = PlasmaAppProps['header'];

export interface Main {

}

export interface Facts {

}

export interface History {

}

export interface Stories {

}

export interface Questions {
    id: string;
}

// Тип описывает состояние экранов приложения
export interface PageStateType {
    main: Main,
    facts: Facts,
    history: History,
    stories: Stories,
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
    HISTORY= 'HISTORY',
    HORROR = 'HORROR',
    FACTS = 'FACTS',
    NEW_FACT = 'NEW_FACT',
    NEW_HORROR = 'NEW_HORROR',
    SYMBOL = 'SYMBOL',
    WHO_NAME = 'WHO_NAME',
    WHO_OCTOBER = 'WHO_OCTOBER',
    WHO_ABOUT = 'WHO_ABOUT'
}

type ActionPayload<T extends ActionType, P extends Record<string, unknown> = any> = {
    type: T;
    payload: P extends void ? never : P;
};

export type AssistantDataAction =
    | Action<ActionPayload<ActionType.FACTS>>
    | Action<ActionPayload<ActionType.HISTORY>>
    | Action<ActionPayload<ActionType.HORROR>>
    | Action<ActionPayload<ActionType.NEW_FACT>>
    | Action<ActionPayload<ActionType.NEW_HORROR>>
    | Action<ActionPayload<ActionType.SYMBOL>>
    | Action<ActionPayload<ActionType.WHO_NAME>>
    | Action<ActionPayload<ActionType.WHO_OCTOBER>>
    | Action<ActionPayload<ActionType.WHO_ABOUT>>

export type StateType = typeof initialState

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>

export type CharacterType = 'sber' | 'joy' | 'eva'