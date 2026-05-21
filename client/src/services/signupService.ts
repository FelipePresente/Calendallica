import type { SignUpCredentials } from "../../../shared/types/signup/SignUp.ts"

const api_url = import.meta.env.VITE_API_URL

export async function signup(credentials: SignUpCredentials): Promise<void> {
    try {
        const response = await fetch(`${api_url}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
            credentials: 'include'
        })

        if (!response.ok) {
            let message = 'Error trying to create account'
            try {
                const text = await response.text()
                if (text) {
                    const data = JSON.parse(text)
                    message = data.message || (typeof data === 'object' ? Object.values(data).join(', ') : message)
                }
            } catch (e) {}
            throw new Error(message)
        }
    } catch (error) {
        throw error
    }
}