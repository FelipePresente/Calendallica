import React, { useState } from "react"
import { createTask } from "../../../services/tasksService.ts"
import closeIcon from "../../../assets/close.svg"

export interface AddTaskProps {
    date: string,
    onClose: () => void;
}

export default function AddTask({ date, onClose }: AddTaskProps) {
    const dateObj = new Date(date.replace(/-/g, '/'))
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })

    const [formData, setFormdata] = useState({
        title: "",
        description: "",
        dueDate: date
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
            await createTask(formData)
            onClose()
            window.location.reload()
        } catch (error) {
            console.error("Failed to create task:", error)
        }
    }

    return (
        <div id="addTaskModal"
            onClick={(e) => { e.stopPropagation(); e.target === e.currentTarget && onClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
        >
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl shadow-2xl p-10 relative overflow-hidden">
                <div className="flex justify-between items-start mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight">New Task</h2>
                        <p className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{formattedDate}</p>
                    </div>
                    <button id="closeAddTaskModal" onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-2 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer group">
                        <img src={closeIcon} className="w-5 h-5 invert opacity-30 group-hover:opacity-100 select-none" alt="Close" />
                    </button>
                </div>

                <form id="addTaskForm" onSubmit={handleSubmit} className="space-y-8">
                    <div className="flex flex-col gap-2">
                        <input
                            name="title"
                            type="text"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Title"
                            className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-indigo-600 transition-all font-bold text-lg"
                            required autoFocus maxLength={50}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description"
                            rows={3}
                            className="list-type w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-indigo-600 transition-all resize-none font-medium"
                            maxLength={300}
                        ></textarea>
                    </div>

                    <button type="submit" className="w-full bg-white hover:bg-zinc-200 text-black font-black py-5 rounded-2xl transition-all cursor-pointer text-base uppercase tracking-widest shadow-xl shadow-white/5">
                        Confirm Task
                    </button>
                </form>
            </div>
        </div>
    )
}
