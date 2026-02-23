import { useState, useEffect } from "react"
import type GoalsResponse from "../../../shared/types/goals/Goals.ts"
import { getGoals } from "../services/goalsService.ts"

export default function useGoals() {
    const [goals, setGoals] = useState<GoalsResponse[]>([])

    useEffect(() => {
        getGoals()
            .then(setGoals)
    }, [])

    return goals
}