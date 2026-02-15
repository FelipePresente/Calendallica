import { Link } from 'react-router-dom'
import Logo from '../../../components/Logo.tsx'

export default function Header() {
    return (
        <header
            className="fixed w-full h-25 py-3 px-6 lg:px-100 flex justify-between items-center z-50 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">

            <a href="/">
                <Logo className="w-30" id="logo" />
            </a>

            <div className="flex items-center gap-8">
                <a href="#section2"
                    className="text-zinc-400 text-sm font-medium cursor-pointer hover:text-zinc-50 transition-colors max-md:hidden">
                    Features
                </a>

                <Link to="/signup"
                    className="rounded-xl md:hidden bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20">
                    Join Now
                </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 max-md:hidden">
                <Link to="/login" className="px-5 py-3 hover:text-indigo-400">Login</Link>
                <Link to="/signup" className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold px-5 py-3 text-center">Sign Up</Link>
            </div>
        </header>
    )
}