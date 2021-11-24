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