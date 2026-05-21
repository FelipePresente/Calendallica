import useAnalytics from "../../../hooks/useAnalytics.ts"
import useMinTimeElapsed from "../../../hooks/useMinTimeElapsed.ts"
import AdminSkeleton from "./AdminSkeleton.tsx"
import { Link } from "react-router-dom"
import logo from "../../../assets/logo.png"

export default function AdminMain() {
    const analytics = useAnalytics()
    const minTimeElapsed = useMinTimeElapsed()

    if (!analytics || !minTimeElapsed) return <AdminSkeleton />

    return (
        <main className="min-h-screen bg-zinc-950 p-6 lg:p-10 flex flex-col items-center justify-center gap-10">
            <Link to="/dashboard" className="hover:scale-105 transition-all duration-300">
                <img src={logo} className="w-32" alt="Calendallica" />
            </Link>

            <div className="w-full max-w-md space-y-4 text-center">
                <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm hover:border-zinc-700 transition-all group">
                    <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Users</h2>
                    <p className="text-4xl font-black text-white group-hover:text-indigo-500 transition-colors">{analytics.user_count}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm hover:border-zinc-700 transition-all group text-center">
                        <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Tasks</h2>
                        <p className="text-3xl font-black text-white group-hover:text-emerald-500 transition-colors">{analytics.task_count}</p>
                    </div>

                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm hover:border-zinc-700 transition-all group text-center">
                        <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Goals</h2>
                        <p className="text-3xl font-black text-white group-hover:text-rose-500 transition-colors">{analytics.goal_count}</p>
                    </div>
                </div>
            </div>

            <Link to="/dashboard" className="text-zinc-600 hover:text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                Back to Dashboard
            </Link>
        </main>
    )
}