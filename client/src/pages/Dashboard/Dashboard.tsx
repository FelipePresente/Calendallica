import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DashboardHeader from "./components/DashboardHeader.tsx"
import DashboardMain from "./components/DashboardMain.tsx"
import checkAuthStatus from "../../services/CheckAuthService.ts"
import type { UserStatus } from "../../../../shared/types/auth/UserStatus.ts"

export default function Dashboard() {
    const navigate = useNavigate()

    const [userData, setUserData] = useState<UserStatus | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await checkAuthStatus()
                setUserData(data)
            } catch(error) {
                navigate('/')
            }
        }
        fetchUser()
    }, [navigate])

    if (!userData) return null

    return (
        <>
            <title>Dashboard - Calendallica</title>
            <DashboardHeader username={userData.username} />
            <DashboardMain />
        </>
    )
}