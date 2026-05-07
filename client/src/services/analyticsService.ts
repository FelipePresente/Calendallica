import type Metrics from '../../../shared/types/analytics/Analytics.ts'

const api_url = import.meta.env.VITE_API_URL

export default async function getMetrics(): Promise<Metrics> {
    try {
        const response = await fetch(`${api_url}/analytics`, {
            credentials: 'include'
        })
        const analytics = await response.json()

        if (!response.ok) {
            throw new Error("Access denied")
        }

        return analytics
    } catch (error) {
        throw error
    }
}