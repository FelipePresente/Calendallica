import React, { useEffect, useState } from "react"
import { getTasks } from "../../../services/tasksService.ts"
import type GetTasksResponse from "../../../../../shared/types/tasks/Tasks.ts"
import toggle from '../../../assets/chevron-down.svg'
import Task from "./Task.tsx"

interface TasksListProps {
    onTaskClick: (dateStr: string) => void
}

export default function TasksList({ onTaskClick }: TasksListProps) {
    const [tasks, setTasks] = useState<React.ReactNode[]>([])

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const userTasks = await getTasks() as unknown as GetTasksResponse[]

                const sortedTasks = userTasks.sort((a, b) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                })

                const newTasks: React.ReactNode[] = []

                sortedTasks.forEach(task => {
                    newTasks.push(<Task key={task._id} task={task} onDateClick={onTaskClick} />)
                })

                setTasks(newTasks)
            } catch (error) {
                throw new Error
            }
        }

        fetchTasks()
    }, [])

    return (
        <div className="lg:col-span-4 space-y-6">

            <details open
                className="group w-full bg-zinc-900 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
                <summary
                    className="list-none p-6 bg-zinc-800/30 cursor-pointer hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 flex justify-between items-center text-zinc-100">
                    <div>
                        <h2 className="text-base font-bold uppercase tracking-widest">Tasks Avaiable</h2>
                        <p className="text-xs text-zinc-500 font-medium uppercase mt-1">
                            {tasks.length === 0 ? "No tasks scheduled" :
                                tasks.length === 1 ? "1 TASK SCHEDULED" :
                                    `${tasks.length} TASKS SCHEDULED`}
                        </p>
                    </div>
                    <div
                        className="w-10 h-10 rounded-full bg-zinc-950/50 flex items-center justify-center border border-zinc-800/50 group-open:rotate-180 transition-transform">
                        <img src={toggle}
                            className="w-4 h-4 invert opacity-50 transition-transform duration-300 group-open:rotate-180 select-none"
                            alt="Toggle" />
                    </div>
                </summary>

                {/* Tasks row */}
                <div className="list-type p-5 space-y-4 overflow-y-auto max-h-[600px] bg-zinc-900/40">
                    {tasks}
                </div>
            </details>
        </div>
    )
}