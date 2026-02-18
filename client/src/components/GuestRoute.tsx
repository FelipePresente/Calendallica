import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import checkAuthStatus from "../services/CheckAuthService.ts"

export default function GuestRoute({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const check = async () => {
            try {
                await checkAuthStatus()

                navigate('/dashboard')
            } catch (error) {
                setIsLoading(false)
            }
        }

        check()
    }, [navigate])

    if (isLoading) return null

    return <>{children}</>
}