import type GoalsResponse from '../../../shared/types/goals/Goals.ts'

const api_url = import.meta.env.VITE_API_URL

export async function getGoals(): Promise<GoalsResponse[]> {
    try {
        const response = await fetch(`${api_url}/goals`, {
            credentials: 'include'
        })
        return await response.json()
    } catch (error) {
        throw new Error("Failed to fetch goals")
    }
}

export async function createGoal(goal: Omit<GoalsResponse, '_id'>) {
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

export async function patchGoal(goal: GoalsResponse) {
    try {
        const response = await fetch(`${api_url}/goals/${goal._id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(goal),
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to update goal")
        return await response.json()
    } catch (error) {
        throw error
    }
}

export async function deleteGoal(goalId: string) {
    try {
        const response = await fetch(`${api_url}/goals/${goalId}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        if (!response.ok) throw new Error("Failed to delete goal")
        return await response.json()
    } catch (error) {
        throw error
    }
}
