import React, { useState } from "react"
import { updateGoal } from "../../../services/goalsService.ts"
import closeIcon from "../../../assets/close.svg"

import type GoalsResponse from "@/types/goals/Goals.ts"

export interface EditGoalProps {
    goal: GoalsResponse,
    onClose: () => void
}

export default function EditGoal({ goal, onClose }: EditGoalProps) {
    const [formData, setFormdata] = useState({
        newTitle: goal.title,
        newDescription: goal.description
    })

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setFormdata(data => ({
            ...data,
            [name]: value
        }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await updateGoal(goal.id, formData)
            onClose()
            window.location.reload()
        } catch (error) {
            console.error("Failed to update goal:", error)
        }
    }

    return (
        <div id="editGoalModal"
            onClick={(e) => { e.stopPropagation(); e.target === e.currentTarget && onClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
        >
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl shadow-2xl p-10 relative overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Edit Goal</h2>
                        <p className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">UPDATE YOUR GOAL</p>
                    </div>
                    <button id="closeEditGoalModal" onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer group">
                        <img src={closeIcon} className="w-5 h-5 invert opacity-30 group-hover:opacity-100 select-none" alt="Close" />
                    </button>
                </div>

                <form id="editGoalForm" onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <input name="newTitle" type="text" value={formData.newTitle} onChange={handleChange} placeholder="Goal Title"
                            className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-emerald-600 transition-all font-bold text-lg"
                            required autoFocus maxLength={50} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <textarea name="newDescription" value={formData.newDescription} onChange={handleChange} placeholder="Description" rows={3}
                            className="list-type w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-emerald-600 transition-all resize-none font-medium"
                            maxLength={300}></textarea>
                    </div>

                    <button type="submit" className="w-full bg-white hover:bg-zinc-200 text-black font-black py-5 rounded-2xl transition-all cursor-pointer text-base uppercase tracking-widest shadow-xl shadow-white/5">
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    )
}
