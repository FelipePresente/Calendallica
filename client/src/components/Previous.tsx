import previous from '../assets/previous.svg'

export interface PreviousProps{
    className?: string,
    id?: string,
    onClick?: (event: React.MouseEvent<HTMLImageElement>) => void
}

export default function Previous({ className, onClick, id }: PreviousProps) {
    return (
        <img src={previous} onClick={onClick} className={className} alt="Previous" />
    )
}