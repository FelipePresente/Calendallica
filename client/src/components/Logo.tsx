import logo from '../assets/logo.png'

export interface LogoProps {
    className?: string,
    id?: string
}

export default function Logo({ className, id }: LogoProps) {
    return (
        <img src={logo} className={className} alt="Calendallica" />
    )
}