import type TasksResponse from '../../../shared/types/tasks/Tasks.ts'

const api_url = import.meta.env.VITE_API_URL

export async function getTasks(): Promise<TasksResponse[]> {
    try {
        const response = await fetch(`${api_url}/tasks`, {
            credentials: 'include'
        })
        return await response.json()
    } catch (error) {
        throw new Error("Failed to fetch tasks")
    }
}

export async function createTask(task: Partial<TasksResponse>) {
    try {
        const response = await fetch(`${api_url}/tasks`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to create task")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function patchTasks(task: TasksResponse) {
    try {
        const response = await fetch(`${api_url}/tasks/${task._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to update task")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function deleteTask(taskId: string) {
    try {
        const response = await fetch(`${api_url}/tasks/${taskId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to delete task")
        return await response.json()
    } catch (error) {
        throw error
    }
}