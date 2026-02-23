import { useState, useEffect } from "react"
import type TasksResponse from "../../../shared/types/tasks/Tasks"
import { getTasks } from "../services/tasksService.ts"

export default function useTasks() {
    const [tasks, setTasks] = useState<TasksResponse[]>([])

    useEffect(() => {
        getTasks()
            .then(data => {
                const userTasks = data as unknown as TasksResponse[]

                const sortedTasks = userTasks.sort((a, b) => {
                    return new Date(a.date).getTime() - new Date(b.date).getTime()
                })

                setTasks(sortedTasks)
            })
    }, [])

    return tasks
}