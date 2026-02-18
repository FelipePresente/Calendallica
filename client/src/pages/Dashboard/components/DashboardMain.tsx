import Orb2 from "../../../components/Orb2.tsx"
import TasksList from "./TasksList.tsx"
import GoalsList from "./GoalsList.tsx"

export default function DashboardMain() {
    

    return (
        <main className="pt-25 min-h-screen w-full relative">
            <Orb2 />

            <section className="grid grid-cols-1 lg:grid-cols-16 gap-8 items-start max-w-screen-2xl mx-auto p-6 lg:p-10">

                <TasksList />
                <GoalsList />

            </section>
        </main>
    )
}