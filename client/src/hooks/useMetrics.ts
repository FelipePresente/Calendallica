import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type Metrics from "../../../shared/types/metrics/Metrics.ts"
import getMetrics from "../services/metricsService.ts"

export default function useMetrics() {
    const navigate = useNavigate()
    const [metrics, setMetrics] = useState<Metrics | null>(null)

    useEffect(() => {
        getMetrics()
            .then(metrics => {
                setMetrics(metrics)
            })
            .catch(() => {
                navigate('/')
            })
    }, [navigate])

    return metrics
}