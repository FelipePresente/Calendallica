import type Metrics from "../../../../../shared/types/metrics/Metrics.ts"
import getMetrics from "../../../services/metricsService.ts"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminMain() {
    const navigate = useNavigate()
    const [metrics, setMetrics] = useState<Metrics | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMetrics()
            .then(metrics => {
                setMetrics(metrics)
                setLoading(false)
            })
            .catch(() => {
                navigate('/')
            })
    }, [navigate])

    if (loading) return <p>Loading...</p>
    if (!metrics) return <p>Error trying to get metrics.</p>

    return (
        <>
            <div>
                <h2>Users count</h2>

                <p>{metrics.users_data}</p>
            </div>

            <div>
                <h2>Tasks count</h2>

                <p>{metrics.tasks_data}</p>
            </div>

            <div>
                <h2>Goals count</h2>

                <p>{metrics.goals_data}</p>
            </div>
        </>
    )
}