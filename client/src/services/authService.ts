import type { LoginCredentials, LoginResponse } from '../../../shared/types/auth/Auth.ts'

const api_url = import.meta.env.VITE_API_URL

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    try {
        const response = await fetch(`${api_url}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Error trying to login')
        }

        return data
    } catch (error) {
        throw error
    }
}

export async function logout(): Promise<void> {

    try {
        await fetch(`${api_url}/users/logout`, {
            credentials: 'include'
        })
    } catch(error) {
        throw new Error
    }
}