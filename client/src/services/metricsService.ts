import type Metrics from '../../../shared/types/metrics/Metrics.ts'

const api_url = import.meta.env.VITE_API_URL

export default async function getMetrics(): Promise<Metrics> {
    try {
        const response = await fetch(`${api_url}/admin/metrics`, {
            credentials: 'include'
        })
        const metrics = await response.json()

        if (!response.ok) {
            throw new Error("Access denied")
        }

        return metrics
    } catch (error) {
        throw error
    }
}