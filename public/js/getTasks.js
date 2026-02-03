export default async function getTasks() {
    const response = await fetch(`/tasks`)
    const tasks = await response.json()

    return tasks
}