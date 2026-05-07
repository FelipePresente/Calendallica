import type GoalsResponse from '../../../shared/types/goals/Goals.ts'

const api_url = import.meta.env.VITE_API_URL

export async function getGoals(): Promise<GoalsResponse[]> {
    try {
        const response = await fetch(`${api_url}/goals`, {
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to fetch goals")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function createGoal(goal: Omit<GoalsResponse, 'id'>) {
    try {
        const response = await fetch(`${api_url}/goals`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal),
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to create goal")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function updateGoal(id: string, data: { newTitle: string, newDescription: string }) {
    try {
        const response = await fetch(`${api_url}/goals/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to update goal")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function deleteGoal(id: string) {
    try {
        const response = await fetch(`${api_url}/goals/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to delete goal")
        
        if (response.status === 204) return
        return await response.json()
    } catch (error) {
        throw error
    }
}
