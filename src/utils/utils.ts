import { Team } from '../types/types'

export function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())]
}

export function getRandomFromArrayWithOldValues<T>(arr: T[], oldValues: T[]): T {
    let isOriginal = false
    let originalItem: T
    while (!isOriginal) {
        originalItem = arr[Math.floor(arr.length * Math.random())]
        if (!oldValues.includes(originalItem)) {
            isOriginal = true
            return originalItem
        }
    }
    return arr[Math.floor(arr.length * Math.random())]
}

export const getTimerPercentage = (timer: number, limit: number) => {
    return (timer / limit) * 100
}

export const victoryCheck = (teams: Team[], wordsCountToWin: number) => {
    const teamsWithWordsMoreLimit: Team[] = []
    teams.forEach(team => {
        if (team.score >= wordsCountToWin) teamsWithWordsMoreLimit.push(team)
    })
    if (teamsWithWordsMoreLimit.length) {
        const maxScore = Math.max(...teamsWithWordsMoreLimit.map(team => team.score))
        const winningTeams = teamsWithWordsMoreLimit.filter(team => team.score === maxScore)
        return winningTeams
    } else {
        return null
    }
}