import type { LoginCredentials } from '../../../shared/types/auth/Auth.ts'

const api_url = import.meta.env.VITE_API_URL

export async function login(credentials: LoginCredentials): Promise<void> {
    try {
        const response = await fetch(`${api_url}/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })

        if (response.ok) return

        let message = 'Error trying to login'
        try {
            const text = await response.text()
            if (text) {
                const data = JSON.parse(text)
                message = data.message || (typeof data === 'object' ? Object.values(data).join(', ') : message)
            }
        } catch (e) {}
        
        throw new Error(message)
    } catch (error: any) {
        throw error
    }
}

export async function logout(): Promise<void> {

    try {
        await fetch(`${api_url}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        })
    } catch (error) {
        throw error
    }
}