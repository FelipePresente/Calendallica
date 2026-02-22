import next from '../assets/next.svg'

export interface NextProps {
    className?: string,
    id?: string,
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

export default function Next({ className, onClick, id }: NextProps) {
    return (
        <img id={id} src={next} className={`${className} select-none`} onClick={onClick} alt="Next" />
    )
}