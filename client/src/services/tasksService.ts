import type TasksResponse from '../../../shared/types/tasks/Tasks.ts'

const api_url = import.meta.env.VITE_API_URL

export async function getTasks(): Promise<TasksResponse[]> {
    try {
        const response = await fetch(`${api_url}/tasks`, {
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to fetch tasks")
        return await response.json()
    } catch (error) {
        throw error
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

export async function updateTask(id: string, data: { newTitle: string, newDescription: string }) {
    try {
        const response = await fetch(`${api_url}/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to update task")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function deleteTask(id: string) {
    try {
        const response = await fetch(`${api_url}/tasks/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to delete task")

        if (response.status === 204) return
        return await response.json()
    } catch (error) {
        throw error
    }
}