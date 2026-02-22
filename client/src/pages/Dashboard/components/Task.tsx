import { useState } from "react"
import EditButton from '../../../components/EditButton.tsx'
import deleteButton from '../../../assets/delete.svg'
import type TasksResponse from "../../../../../shared/types/tasks/Tasks.ts"
import EditTask from './EditTask.tsx'
import DeleteTask from './DeleteTask.tsx'

export interface TaskProps {
    task: TasksResponse,
    onDateClick: (dateStr: string) => void
}

export default function Task({ task, onDateClick }: TaskProps) {
    const taskDate = new Date(task.date)

    const weekday = taskDate.toLocaleDateString('en-US', { weekday: 'long' })
    const year = taskDate.getFullYear()
    const month = taskDate.toLocaleString('en-US', { month: 'short' })
    const day = taskDate.getDate()

    const formattedDate = `${year} ${month} ${day} ${weekday}`

    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleTaskEdit = () => {
        setIsEditing(true)
    }

    const handleCloseTaskEdit = () => {
        setIsEditing(false)
    }

    const handleTaskDelete = () => {
        setIsDeleting(true)
    }

    const handleCloseTaskDelete = () => {
        setIsDeleting(false)
    }

    return (
        <div onClick={() => {
            onDateClick(task.date)
        }} className="task-cell p-5 cursor-pointer bg-zinc-950/20 border border-zinc-800/40 rounded-xl hover:border-zinc-700 transition-all shadow-sm group/item relative">

            {isEditing && <EditTask task={task} onClose={handleCloseTaskEdit} />}
            {isDeleting && <DeleteTask taskId={task._id} onClose={handleCloseTaskDelete} />}

            <div className="flex justify-between items-start mb-2">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{formattedDate}</span>
                <div className="flex gap-2 md:opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); handleTaskEdit(); }} className="edit-cell flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer" title="Edit">
                        <EditButton className="w-3.5 h-3.5 invert opacity-50" />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleTaskDelete(); }} className="delete-cell flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900/50 group transition-all cursor-pointer" title="Delete">
                        <img src={deleteButton} className="w-3.5 h-3.5 invert opacity-50 group-hover:text-red-400 select-none" alt="Delete" />
                    </button>
                </div>
            </div>
            <h4 className="text-sm font-bold text-zinc-100" dangerouslySetInnerHTML={{ __html: task.title }}></h4>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: task.description }}></p>
        </div>
    )
}