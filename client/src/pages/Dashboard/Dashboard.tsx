import DashboardHeader from "./components/DashboardHeader.tsx"
import DashboardMain from "./components/DashboardMain.tsx"
import DashboardSkeleton from "./components/DashboardSkeleton.tsx"
import useMinTimeElapsed from "../../hooks/useMinTimeElapsed.ts"
import type { UserStatus } from "@/types/auth/Auth.ts"

export interface UserDataProps {
    userData?: UserStatus
}

export default function Dashboard({ userData }: UserDataProps) {
    const minTimeElapsed = useMinTimeElapsed()

    if (!userData || !minTimeElapsed) return <DashboardSkeleton />

    return (
        <>
            <title>Dashboard - Calendallica</title>
            <DashboardHeader username={userData.username} role={userData.role} />
            <DashboardMain />
        </>
    )
}