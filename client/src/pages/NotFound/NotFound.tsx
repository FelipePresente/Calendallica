import { Link } from "react-router-dom";
import Logo from "../../components/Logo.tsx";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 text-center select-none overflow-hidden relative">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-900/10 blur-[120px] rounded-full -z-10" />

            <div className="mb-12 opacity-60">
                <Logo className="w-40" />
            </div>

            <h1 className="text-8xl md:text-9xl font-bold text-zinc-800 mb-4 tracking-tighter">
                404
            </h1>

            <p className="text-zinc-500 text-lg mb-12 max-w-sm">
                Oops! The page you're looking for was not found or doesn't exist.
            </p>

            <Link
                to="/"
                className="px-15 py-3 bg-zinc-900 text-zinc-300 border border-zinc-800/50 rounded-xl hover:bg-zinc-800 hover:text-zinc-100 transition-all duration-300 shadow-2xl">
                Return
            </Link>
        </div>
    );
}
