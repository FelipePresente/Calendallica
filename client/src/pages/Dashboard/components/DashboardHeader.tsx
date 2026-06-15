import { Link } from "react-router-dom"
import Logo from "../../../components/Logo.tsx"
import type { UserStatus } from "@/types/auth/Auth.ts"
import { logout } from "../../../services/authService.ts"
import { useNavigate } from "react-router-dom"

export default function DashboardHeader({ username, role }: UserStatus) {
    if (!username) throw new Error

    const navigate = useNavigate()
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1)

    const handleLogout = async () => {
        await logout()
        navigate('/')
    }

    return (
        <header
            className="fixed w-full h-25 py-3 px-6 lg:px-100 flex justify-between items-center z-10 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">

            <Link to="/"><Logo className="w-30" /></Link>

            {role === "admin" && (
                <Link
                    to="/admin"
                    className="text-[10px] font-black uppercase tracking-[0.2em] hover:text-zinc-500 transition-all"
                >
                    Analytics
                </Link>
            )}

            <div className="flex items-center gap-4 md:gap-6">
                <p className="text-zinc-400 text-sm hidden md:block">Welcome, <span className="text-zinc-50 font-semibold">{formattedUsername}</span></p>
                <div onClick={handleLogout} className="flex items-center justify-center rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 font-bold px-4 py-2 md:px-5 md:py-2.5 text-xs md:text-sm cursor-pointer transition-all text-zinc-400 hover:text-red-400">
                    Logout
                </div>
            </div>

        </header>
    )
}