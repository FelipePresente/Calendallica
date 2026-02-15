import type { SignUpCredentials, SignUpResponse } from "../../../shared/types/signup/SignUp.ts"

const api_url = import.meta.env.VITE_API_URL

export async function signup(credentials: SignUpCredentials): Promise<SignUpResponse> {
    try {
        const response = await fetch(`${api_url}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Error trying to create account')
        }

        return data
    } catch (error) {
        throw error
    }
}