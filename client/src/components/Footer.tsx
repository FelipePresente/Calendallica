import { Link } from "react-router-dom"
import Logo from "./Logo.tsx"

export default function Footer() {
    return (
        <footer className="h-50 p-5 border-t border-zinc-900 grid grid-rows-3">

            <a href="/" className="flex justify-center items-center">
                <Logo className="w-20" />
            </a>


            <div className="flex justify-center items-center">
                <p className="text-center text-sm text-zinc-400">&copy; 2026 Built to simplify your life.</p>
            </div>


            <div className="flex justify-center gap-5 items-center">
                <Link to="https://github.com/FelipePresente" className="text-zinc-400 text-sm">Github</Link>
                <Link to="https://www.linkedin.com/in/felipe-presente-90b8923a5/" className="text-zinc-400 text-sm">Linkedin</Link>
            </div>

        </footer>
    )
}