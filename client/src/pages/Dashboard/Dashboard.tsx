import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { checkAuthStatus } from "../../services/CheckAuthService"

export default function Dashboard() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        checkAuthStatus()
            .then(() => {
                setIsLoading(false)
            })
            .catch(() => {
                navigate('/')
            })
    }, [navigate])

    if (isLoading) return <p>Loading dashboard...</p>
    return (
        <div>Hello, User!</div>
    )
}