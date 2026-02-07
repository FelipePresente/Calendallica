import ratelimitError from "./ratelimitError.js"

export default async function getTasks() {
    const response = await fetch(`/tasks`)

    if (await ratelimitError(response)) return []

    const tasks = await response.json()

    return tasks
}