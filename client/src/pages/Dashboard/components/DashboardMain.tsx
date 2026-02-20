import { useState } from "react"
import Orb2 from "../../../components/Orb2.tsx"
import TasksList from "./TasksList.tsx"
import GoalsList from "./GoalsList.tsx"
import Calendar from "./Calendar.tsx"

export default function DashboardMain() {
    const [selectedDate, setSelectedDate] = useState(new Date())

    return (
        <main className="pt-25 min-h-screen w-full relative">
            <Orb2 />

            <section className="grid grid-cols-1 lg:grid-cols-16 gap-8 items-start max-w-screen-2xl mx-auto p-6 lg:p-10">

                <TasksList onTaskClick={(dateStr: string) => setSelectedDate(new Date(dateStr))} />
                <GoalsList />
                <Calendar dateProp={selectedDate} />

            </section>
        </main>
    )
}