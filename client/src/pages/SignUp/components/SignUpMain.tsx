import { Link, useNavigate } from "react-router-dom"
import type { SignUpCredentials } from '../../../../../shared/types/signup/SignUp.ts'
import { signup } from "../../../services/signupService.ts"
import { useState } from 'react'
import Orb2 from "../../../components/Orb2.tsx"
import Logo from "../../../components/Logo.tsx"
import SubmitButton from "../../../components/SubmitButton.tsx"
import ErrorMessage from "../../../components/ErrorMessage.tsx"

interface SignUpForm extends SignUpCredentials {
    passwordConfirmation: string
}

export default function SignUpMain() {
    const navigate = useNavigate()
    const [formData, setFormdata] = useState<SignUpForm>({
        username: "",
        password: "",
        passwordConfirmation: ""
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

        if (formData.password !== formData.passwordConfirmation) {
            return setErrorMessage("Passwords do not match.")
        }

        setIsLoading(true)
        setErrorMessage(null)

        try {
            const { username, password } = formData
            await signup({ username, password })

            navigate("/dashboard")
        } catch (error: any) {
            return setErrorMessage(error.message || "An error occurred while creating your account.")
        } finally {
            setIsLoading(false)
        }
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

                <form onSubmit={handleSubmit} className="grid w-full md:container grid-rows-3 gap-5 pb-10 border-b border-zinc-800/50">

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm py-2 text-zinc-500">CHOOSE USERNAME</label>

                        <input onChange={handleChange} name="username" value={formData.username} className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-5 md:py-5 :px-7"
                            type="text" placeholder="Username" minLength={4} maxLength={12} required />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm py-2 text-zinc-500">TYPE PASSWORD</label>

                        <input onChange={handleChange} name="password" value={formData.password} className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-5 md:py-5 :px-7"
                            type="password" placeholder="Min. 8 characters" minLength={8} maxLength={35}
                            required />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold text-sm py-2 text-zinc-500">CONFIRM
                            PASSWORD</label>

                        <input onChange={handleChange} name="passwordConfirmation" value={formData.passwordConfirmation}
                            className="bg-zinc-950/50 border border-zinc-800 rounded-xl py-3 px-5 md:py-5 :px-7" type="password"
                            placeholder="Repeat Password" minLength={8} maxLength={35} />
                    </div>

                    <SubmitButton disabled={isLoading} value={isLoading ? "Creating Account..." : "Create Free Account"} />

                </form>

                <div className="mt-5 flex flex-col justify-center items-center gap-3 max-sm:text-sm">
                    <p className="text-zinc-400">Already have an account? <Link to="/login"
                        className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">Sign in here</Link>
                    </p>
                    <Link to="/" className="hover:text-zinc-300 text-zinc-400 transition-colors">Return</Link>

                </div>
            </div>
        </main>
    )
}