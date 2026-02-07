import ratelimitError from "./ratelimitError.js"

export default async function getGoals() {
    const response = await fetch('/goals')

    if (await ratelimitError(response)) return []

    const goals = await response.json()

    return goals
}