import React, { useEffect, useState } from "react"
import CalendarDayCurrent from "../../../components/CalendarDayCurrent.tsx"
import CalendarDayCommon from "../../../components/CalendarDayCommon.tsx"
import CalendarDayEmpty from "../../../components/CalendarDayEmpty.tsx"
import Previous from "../../../components/Previous.tsx"
import Next from "../../../components/Next.tsx"

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

export default function CalendarPreview() {

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentDay = currentDate.getDate()
    const currentYear = currentDate.getFullYear()

    const [days, setDays] = useState<React.ReactNode[]>([])
    const [headerText, setHeaderText] = useState("")

    useEffect(() => {

        const leapYear = isLeapYear(currentYear)
        const dayOne = new Date(currentYear, currentMonth, 1).getDay()

        if (leapYear) year[1].days = 29
        else year[1].days = 28

        setHeaderText(`${year[currentMonth].name} ${currentYear}`.toUpperCase());

        const newDays: React.ReactNode[] = []

        for (let i = 0; i < dayOne; i++) {
            newDays.push(<CalendarDayEmpty key={`empty-${i}`} />)
        }

        let day = 0
        for (let i = 0; i < year[currentMonth].days; i++) {
            day++

            if (day === currentDay) {
                newDays.push(<CalendarDayCurrent key={`day-${day}`} day={day} />);
            }
            else if (day !== currentDay) {
                newDays.push(<CalendarDayCommon key={`day-${day}`} day={day} />);
            }
        }

        setDays(newDays);
    }, []);

    return (
        <div className="bg-zinc-900 flex flex-col justify-center mt-10 rounded-3xl p-6 border border-zinc-800/50 shadow-2xl shadow-black/50">

            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8 border-b border-zinc-800 pb-6">
                <div className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-all group">
                    <Previous className="opacity-50 invert group-hover:opacity-100 transition-opacity" />
                </div>

                <h3 className="text-zinc-500 text-sm font-bold tracking-widest">{headerText}</h3>

                <div className="cursor-pointer hover:bg-zinc-800 p-2 rounded-lg transition-all group">
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
