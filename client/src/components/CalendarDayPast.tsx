export default function CalendarDayPast({ day }: { day: number }) {
    return (
        <div className="bg-zinc-950/40 border border-zinc-900/50 aspect-square rounded-lg flex items-center justify-center text-zinc-800 font-semibold text-sm select-none">
            {day}
        </div>
    )
}
