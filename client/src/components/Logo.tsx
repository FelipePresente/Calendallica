import logo from '../assets/logo.png'

export interface LogoProps {
    className?: string
}

export default function Logo({ className }: LogoProps) {
    return (
        <img src={logo} className={`${className} select-none`} alt="Calendallica" />
    )
}