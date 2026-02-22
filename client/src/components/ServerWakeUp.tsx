import Logo from "./Logo.tsx"
import Orb2 from "./Orb2.tsx"

export default function ServerWakeUp() {
    return (
        <div className="fixed inset-0 bg-zinc-950 flex flex-col items-center justify-center gap-6">

            <Orb2 />

            <div className="select-none">
                <Logo className="w-60" />
            </div>

            <div className="w-12 h-12 border-2 border-zinc-800 border-t-zinc-400 rounded-full animate-spin select-none"></div>

            <div className="text-center">
                <h2 className="text-zinc-500 text-xs font-bold uppercase tracking-[0.4em]">
                    Wakening server
                </h2>
            </div>

        </div>
    )
}
