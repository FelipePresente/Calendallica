import { cloneElement, type ReactElement } from "react"
import useUserData from "../hooks/useUserData.ts"

export interface Props {
    children: ReactElement,
    adminOnly?: boolean
}

export default function ProtectedRoute({ children, adminOnly }: Props) {
    const userData = useUserData(adminOnly === true)

    return cloneElement(children as ReactElement<any>, { userData })
}