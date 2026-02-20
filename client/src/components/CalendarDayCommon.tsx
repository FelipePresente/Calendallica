import TaskOrb from "./TaskOrb.tsx"

export interface Props {
    day: number,
    hasTask?: boolean,
    isSelected?: boolean,
    onClick: (day: number) => void
}

export default function CalendarDayCommon({ day, hasTask, isSelected, onClick }: Props) {
    return (
        <div onClick={() => onClick(day)} className={`bg-zinc-950/50 hover:border-gray-700 aspect-square border ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500/20' : 'border-zinc-800/50'} font-semibold text-sm ${isSelected ? 'text-zinc-100' : 'text-zinc-600'} rounded-lg flex items-center justify-center relative cursor-pointer transition-all`}>
            {day}
            {hasTask ? <TaskOrb /> : null}
        </div>
    )
}