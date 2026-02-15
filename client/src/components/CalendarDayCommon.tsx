export default function CalendarDayCommon({ day }: { day: number }) {
    return (
        <div className="bg-zinc-950/50 aspect-square border border-zinc-800/50 font-semibold text-sm text-zinc-600 rounded-lg flex items-center justify-center">
            {day}
        </div>
    )
}
