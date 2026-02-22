import DashboardHeader from "./components/DashboardHeader.tsx"
import DashboardMain from "./components/DashboardMain.tsx"
import type { UserStatus } from "../../../../shared/types/auth/Auth.ts"

export interface UserDataProps {
    userData?: UserStatus
}

export default function Dashboard({ userData }: UserDataProps) {
    if (!userData) return null

    return (
        <>
            <title>Dashboard - Calendallica</title>
            <DashboardHeader username={userData.username} />
            <DashboardMain />
        </>
    )
}