import React, { useEffect, useState } from "react"
import { getTasks } from "../../../services/tasksService.ts"
import type TasksResponse from "../../../../../shared/types/tasks/Tasks.ts"
import CalendarDayCurrent from "../../../components/CalendarDayCurrent.tsx"
import CalendarDayCommon from "../../../components/CalendarDayCommon.tsx"
import CalendarDayEmpty from "../../../components/CalendarDayEmpty.tsx"
import Previous from "../../../components/Previous.tsx"
import Next from "../../../components/Next.tsx"
import AddTask from "./AddTask.tsx"

const year = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
]

function isLeapYear(year: number) {
    const leapYear = new Date(year, 1, 29);
    return leapYear.getMonth() === 1;
}

export interface Props {
    dateProp: Date
}

export default function Calendar({ dateProp }: Props) {
    const [headerText, setHeaderText] = useState("")
    const [date, setDate] = useState(new Date(dateProp))
    const [addingTaskDate, setAddingTaskDate] = useState<string | null>(null)
    const [tasks, setTasks] = useState<TasksResponse[]>([])

    function handlePrevious() {
        const newDate = new Date(date.getFullYear(), date.getMonth() - 1)
        setDate(newDate)
    }

    function handleNext() {
        const newDate = new Date(date.getFullYear(), date.getMonth() + 1)
        setDate(newDate)
    }

    function handleDayClick(day: number) {
        const clickedDate = new Date(date.getFullYear(), date.getMonth(), day)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (clickedDate >= today) {
            setAddingTaskDate(clickedDate.toISOString())
        }
    }

    useEffect(() => {
        setDate(new Date(dateProp))
    }, [dateProp])

    // Fetch tasks separately so it doesn't block month switching
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data = await getTasks() as unknown as TasksResponse[]
                setTasks(data)
            } catch (error) {
                console.error("Error fetching tasks:", error)
            }
        }
        fetchTasks()
    }, [addingTaskDate]) // Re-fetch when adding or closing AddTask modal

    // Compute calendar grid instantaneously
    const renderCalendar = () => {
        const taskDates = new Set(tasks.map(t => new Date(t.date).toLocaleDateString("en-CA")))

        const leapYear = isLeapYear(date.getFullYear())
        const dayOne = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

        if (leapYear) year[1].days = 29
        else year[1].days = 28

        const newDays: React.ReactNode[] = []

        // Fill empty days
        for (let i = 0; i < dayOne; i++) {
            newDays.push(<CalendarDayEmpty key={`empty-${i}`} />)
        }

        let day = 0
        const currentDate = new Date()

        for (let i = 0; i < year[date.getMonth()].days; i++) {
            day++

            const loopDateObj = new Date(date.getFullYear(), date.getMonth(), day)
            const loopDateString = loopDateObj.toLocaleDateString("en-CA")
            const hasTask = taskDates.has(loopDateString)

            if (currentDate.getDate() === day && currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear()) {
                newDays.push(<CalendarDayCurrent hasTask={hasTask} key={`day-${day}`} day={day} onClick={handleDayClick} />)
            }
            else {
                newDays.push(<CalendarDayCommon hasTask={hasTask} key={`day-${day}`} day={day} onClick={handleDayClick} />)
            }
        }
        return newDays
    }

    // Update Header Text separately
    useEffect(() => {
        setHeaderText(`${year[date.getMonth()].name} ${date.getFullYear()}`.toUpperCase())
    }, [date])

    const days = renderCalendar()

    return (
        <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800/50 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">

            {addingTaskDate && (
                <AddTask date={addingTaskDate} onClose={() => setAddingTaskDate(null)} />
            )}

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
                <div onClick={handlePrevious} className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-all group">
                    <Previous className="opacity-50 invert group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-zinc-500 text-sm font-bold tracking-widest">{headerText}</h3>

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