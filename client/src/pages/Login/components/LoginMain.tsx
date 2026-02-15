import { login } from '../../../services/authService.ts'
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import type { LoginCredentials } from "../../../../../shared/types/auth/Auth.ts"
import Orb2 from "../../../components/Orb2.tsx"
import Logo from "../../../components/Logo.tsx"
import SubmitButton from '../../../components/SubmitButton.tsx'
import ErrorMessage from '../../../components/ErrorMessage.tsx'

export default function LoginMain() {
    const navigate = useNavigate()
    const [formData, setFormdata] = useState<LoginCredentials>({
        username: "",
        password: ""
    })
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setFormdata(data => ({
            ...data,
            [name]: value
        }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)
        setErrorMessage(null)

        try {
            await login(formData)
        } catch (error: any) {
            return setErrorMessage(error.message || "Error trying to get response")
        } finally {
            setIsLoading(false)
        }

        navigate('/')
    }

    return (
        <main
            className="text-zinc-50 antialiased min-h-screen flex flex-col items-center justify-center p-5 md:p-10 relative">

            {errorMessage && <ErrorMessage errorText={errorMessage} />}

            <Orb2 />

            <Link to="/"><Logo className="max-w-90" /></Link>

            {/* Container */}
            <div
                className="max-w-120 container flex flex-col p-8 justify-center items-center bg-zinc-900/40 border border-zinc-800/50 rounded-2xl">

                <form onSubmit={handleSubmit} className="grid w-full md:container grid-rows-2 gap-5 pb-10 border-b border-zinc-800/50" id="loginForm">

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm py-2 text-zinc-500" htmlFor="username">TYPE USERNAME</label>

                        <input name="username" value={formData.username} onChange={handleChange} className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-5 md:py-5 :px-7"
                            type="text" id="login-username" placeholder="Username" minLength={4} maxLength={12} required />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm py-2 text-zinc-500" htmlFor="password">TYPE PASSWORD</label>

                        <input name="password" value={formData.password} onChange={handleChange} className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-5 md:py-5 :px-7"
                            type="password" id="login-password" placeholder="Password" minLength={8} maxLength={35} required />
                    </div>

                    <SubmitButton disabled={isLoading} value={isLoading ? "Connecting..." : "Connect to account"} />
                </form>

                <div className="mt-5 flex flex-col justify-center items-center gap-3 max-sm:text-sm">
                    <p className="text-zinc-400">Don't have an account yet? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign up here</Link></p>
                    <Link to="/" className="hover:text-zinc-300 text-zinc-400 transition-colors">Return</Link>
                </div>
            </div>
        </main>
    )
}