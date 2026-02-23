import { useState, useEffect } from "react"

export default function useMinTimeElapsed() {
    const [minTimeElapsed, setMinTimeElapsed] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setMinTimeElapsed(true)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return minTimeElapsed
}