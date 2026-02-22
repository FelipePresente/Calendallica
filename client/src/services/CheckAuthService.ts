import type { UserStatus } from "../../../shared/types/auth/Auth.ts"

const api_url = import.meta.env.VITE_API_URL

export default async function checkAuthStatus(): Promise<UserStatus> {
    try {
        const response = await fetch(`${api_url}/status/me`, {
            credentials: 'include'
        })

        if (!response.ok) {
            throw new Error("Invalid or expired session")
        }

        return await response.json()
    } catch (error) {
        throw error
    }
}