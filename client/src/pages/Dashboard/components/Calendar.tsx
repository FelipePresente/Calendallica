import CalendarDayCurrent from "../../../components/CalendarDayCurrent.tsx"
import CalendarDayCommon from "../../../components/CalendarDayCommon.tsx"
import CalendarDayEmpty from "../../../components/CalendarDayEmpty.tsx"
import CalendarDayPast from "../../../components/CalendarDayPast.tsx"
import Previous from "../../../components/Previous.tsx"
import Next from "../../../components/Next.tsx"
import AddTask from "./AddTask.tsx"
import useCalendar from "../../../hooks/useCalendar.ts"
import useTasks from "../../../hooks/useTasks.ts"

export default function Calendar({ dateProp }: { dateProp: Date }) {
    const { currentDate, calendarData, handlePrevious, handleNext, handleDayClick, addingTaskDate, closeAddTask } = useCalendar(dateProp)

    const tasks = useTasks()

    const renderCalendar = () => {
        const taskDates = new Set(tasks.map(t => new Date(t.date).toLocaleDateString("en-CA")))

        const newDays: React.ReactNode[] = []

        for (let i = 0; i < calendarData.dayOne; i++) {
            newDays.push(<CalendarDayEmpty key={`empty-${i}`} />)
        }

        const todaysDate = new Date()
        todaysDate.setHours(0, 0, 0, 0)

        for (let day = 1; day <= calendarData.daysInMonth; day++) {
            const loopDateObj = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            loopDateObj.setHours(0, 0, 0, 0)

            const loopDateString = loopDateObj.toLocaleDateString("en-CA")
            const hasTask = taskDates.has(loopDateString)

            if (loopDateObj < todaysDate) {
                newDays.push(<CalendarDayPast key={`day-${day}`} day={day} />)
            } else if (loopDateObj.getTime() === todaysDate.getTime()) {
                newDays.push(<CalendarDayCurrent hasTask={hasTask} key={`day-${day}`} day={day} onClick={handleDayClick} />)
            } else {
                newDays.push(<CalendarDayCommon hasTask={hasTask} key={`day-${day}`} day={day} onClick={handleDayClick} />)
            }
        }
        return newDays
    }


    const days = renderCalendar()

    return (
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800/50 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">

            {addingTaskDate && (<AddTask date={addingTaskDate} onClose={closeAddTask} />)}

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
                <div onClick={handlePrevious} className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-all group">
                    <Previous className="opacity-50 invert group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-zinc-500 text-sm font-bold tracking-widest">{calendarData.headerText}</h3>

                <div onClick={handleNext} className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-all group">
                    <Next className="opacity-50 invert group-hover:opacity-100 transition-opacity" />
                </div>
            </div>

            {/* Days of Week */}
            <div className="grid grid-cols-7 place-items-center mb-4 w-full gap-3 text-zinc-500 text-xs font-semibold tracking-wider">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>

            {/* Calendar Grid */}
            <div className="w-full h-full grid grid-cols-7 gap-3">
                {days}
            </div>

        </div>
    )
}
