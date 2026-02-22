import editbutton from '../assets/edit.svg'

export interface editButtonProps {
    className?: string,
    onClick?: React.MouseEventHandler<HTMLImageElement>
}

export default function editButton({ className, onClick }: editButtonProps) {
    return (
        <img src={editbutton} className={`${className} select-none`} onClick={onClick} alt="Edit" />
    )
}