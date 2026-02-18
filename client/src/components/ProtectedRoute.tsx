import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import checkAuthStatus from "../services/CheckAuthService.ts"

export interface Props {
    children: React.ReactNode,
    adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly }: Props) {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const verify = async () => {
            try {
                const user = await checkAuthStatus()

                if (adminOnly && user.role !== "admin") throw new Error

                setIsAuthenticated(true)
            } catch (error) {
                navigate('/')
            }
        }

        verify()
    }, [navigate, adminOnly])

    if (!isAuthenticated) return <p>Checking authentication...</p>

    return <>{children}</>
}