import { useState } from "react"
import EditButton from '../../../components/EditButton.tsx'
import deleteButton from '../../../assets/delete.svg'
import type GoalsResponse from "@/types/goals/Goals.ts"
import EditGoal from "./EditGoal.tsx"
import DeleteGoal from "./DeleteGoal.tsx"

export interface GoalProps {
    goal: GoalsResponse
}

export default function Goal({ goal }: GoalProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleEdit = () => setIsEditing(true)
    const handleCloseEdit = () => setIsEditing(false)
    const handleDelete = () => setIsDeleting(true)
    const handleCloseDelete = () => setIsDeleting(false)

    return (
        <div className="goal-cell p-5 cursor-pointer bg-zinc-950/20 border border-zinc-800/40 rounded-xl hover:border-emerald-900/50 hover:bg-emerald-900/5 transition-all shadow-sm group/item relative overflow-hidden">

            {isEditing && <EditGoal goal={goal} onClose={handleCloseEdit} />}
            {isDeleting && <DeleteGoal goalId={goal.id} onClose={handleCloseDelete} />}

            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-600/30 group-hover/item:bg-emerald-500 transition-colors"></div>

            <div className="flex justify-between items-start mb-3">
                <span className="text-[9px] font-black text-emerald-500/60 uppercase tracking-widest bg-emerald-500/5 px-2 py-0.5 rounded-md border border-emerald-500/10">Goal Achievement</span>

                <div className="flex gap-2 md:opacity-0 group-hover/item:opacity-100 transition-opacity">
                    <button onClick={handleEdit} className="edit-goal flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer" title="Edit">
                        <EditButton className="w-3.5 h-3.5 invert opacity-50" />
                    </button>
                    <button onClick={handleDelete} className="delete-goal flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900/50 group transition-all cursor-pointer" title="Delete">
                        <img src={deleteButton} className="w-3.5 h-3.5 invert opacity-50 group-hover:text-red-400 select-none" alt="Delete" />
                    </button>
                </div>
            </div>

            <h4 className="text-sm font-bold text-zinc-100 group-hover/item:text-emerald-50" dangerouslySetInnerHTML={{ __html: goal.title }}></h4>
            <p className="text-xs text-zinc-500 mt-1.5 group-hover/item:text-zinc-400" dangerouslySetInnerHTML={{ __html: goal.description }}></p>
        </div>
    )
}
