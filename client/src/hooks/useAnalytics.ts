import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type Analytics from "../../../shared/types/analytics/Analytics.ts"
import getAnalytics from "../services/analyticsService.ts"

export default function useMetrics() {
    const navigate = useNavigate()
    const [analytics, setAnalytics] = useState<Analytics | null>(null)

    useEffect(() => {
        getAnalytics()
            .then(analytics => {
                setAnalytics(analytics)
            })
            .catch(() => {
                navigate('/')
            })
    }, [navigate])

    return analytics
}