import TaskOrb from "./TaskOrb.tsx"

export interface Props {
    day: number,
    hasTask?: boolean,
    onClick: (day: number) => void
}

export default function CalendarDayCurrent({ day, hasTask, onClick }: Props) {
    return (
        <div onClick={() => onClick(day)} className="bg-indigo-600 aspect-square border border-indigo-400 shadow-lg shadow-indigo-600/50 font-semibold text-sm text-white rounded-lg flex items-center justify-center relative cursor-pointer">
            {day}
            {hasTask ? <TaskOrb /> : null}
        </div>
    )
}
