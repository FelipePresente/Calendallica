import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import checkAuthStatus from "../services/CheckAuthService.ts"
import type { UserStatus } from "../../../shared/types/auth/Auth.ts"

export default function useUserData(adminOnly: boolean) {
    const navigate = useNavigate()
    const [userData, setUserData] = useState<UserStatus | null>(null)

    useEffect(() => {
        const verify = async () => {
            try {
                const user = await checkAuthStatus()

                if (adminOnly && user.role !== "admin") throw new Error

                setUserData(user)
            } catch (error) {
                navigate('/')
            }
        }

        verify()
    }, [navigate, adminOnly])

    return userData
}