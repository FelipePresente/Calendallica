export async function getGoals() {
    const response = await fetch('/goals')
    const goals = await response.json()

    return goals
}