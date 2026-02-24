import { useState, useEffect, useMemo } from "react"

const year_data = [
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

export default function useCalendar(dateProp: Date) {
    const [currentDate, setCurrentDate] = useState(new Date(dateProp))
    const [addingTaskDate, setAddingTaskDate] = useState<string | null>(null)

    useEffect(() => {
        setCurrentDate(new Date(dateProp))
    }, [dateProp])

    const handlePrevious = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
    }
    const handleNext = () => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
    }

    const handleDayClick = (day: number) => {
        const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (clickedDate >= today) {
            setAddingTaskDate(clickedDate.toISOString())
        }
    }

    const closeAddTask = () => setAddingTaskDate(null)

    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        const daysInMonth = (month === 1 && isLeapYear(year) ? 29 : year_data[month].days)

        const dayOne = new Date(year, month, 1).getDay()

        const monthName = year_data[month].name.toUpperCase()
        const headerText = `${monthName} ${year}`

        return { year, month, daysInMonth, dayOne, headerText }
    }, [currentDate])

    return { currentDate, calendarData, handlePrevious, handleNext, handleDayClick, addingTaskDate, closeAddTask }
}