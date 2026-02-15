import next from '../assets/next.svg'

export interface NextProps {
    className?: string,
    id?: string,
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

export default function Next({ className, onClick, id }: NextProps) {
    return (
        <img src={next} className={className} onClick={onClick} alt="Next" />
    )
}