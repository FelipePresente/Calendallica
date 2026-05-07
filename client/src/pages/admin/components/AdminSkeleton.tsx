import LoadingSpinner from "../../../components/LoadingSpinner.tsx"
import logo from "../../../assets/logo.png"

export default function AdminSkeleton() {
    return (
        <main className="min-h-screen bg-zinc-950 p-6 lg:p-10 flex flex-col items-center justify-center gap-10">
            <div className="opacity-20 grayscale">
                <img src={logo} className="w-32" alt="Calendallica" />
            </div>

            <div className="w-full max-w-md space-y-4">
                <div className="flex items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm">
                    <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Users</h2>
                    <LoadingSpinner />
                </div>

                <div className="flex items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm">
                    <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Tasks</h2>
                    <LoadingSpinner />
                </div>

                <div className="flex items-center justify-between p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-xl backdrop-blur-sm">
                    <h2 className="text-zinc-500 font-black uppercase tracking-[0.2em] text-[10px]">Goals</h2>
                    <LoadingSpinner />
                </div>
            </div>

            <div className="h-4 w-32 bg-zinc-900/50 rounded-full animate-pulse"></div>
        </main>
    )
}