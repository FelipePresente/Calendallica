import { useState, useEffect } from "react"
import type GoalsResponse from "@/types/goals/Goals.ts"
import { getGoals } from "../services/goalsService.ts"

export default function useGoals() {
    const [goals, setGoals] = useState<GoalsResponse[]>([])

    useEffect(() => {
        getGoals()
            .then(setGoals)
            .catch(error => console.error("Error fetching goals:", error))
    }, [])

    return goals
}