export default function CalendarDayCurrent({ day }: { day: number }) {
    return (
        <div className="bg-indigo-600 aspect-square border border-indigo-400 shadow-lg shadow-indigo-600/50 font-semibold text-sm text-white rounded-lg flex items-center justify-center">
            {day}
        </div>
    )
}
