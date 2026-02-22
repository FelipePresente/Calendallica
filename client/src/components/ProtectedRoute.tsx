import { cloneElement, type ReactElement } from "react"
import useUserData from "../hooks/useUserData.ts"
import DashboardSkeleton from "./DashboardSkeleton.tsx"

export interface Props {
    children: ReactElement,
    adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly }: Props) {
    const userData = useUserData(adminOnly === true)

    if (!userData) return <DashboardSkeleton />

    return cloneElement(children as ReactElement<any>, { userData })
}