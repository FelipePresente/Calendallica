import { deleteTask } from "../../../services/tasksService.ts"
import closeIcon from "../../../assets/close.svg"

export interface DeleteTaskProps {
    taskId: string;
    onClose: () => void;
}

export default function DeleteTask({ taskId, onClose }: DeleteTaskProps) {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await deleteTask(taskId)
            onClose()
            window.location.reload()
        } catch (error) {
            console.error("Failed to delete task:", error)
        }
    }

    return (
        <div id="deleteTaskModal"
            onClick={(e) => { e.stopPropagation(); e.target === e.currentTarget && onClose(); }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm"
        >
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-[320px] rounded-2xl shadow-2xl p-6 relative overflow-hidden">

                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-lg font-black text-white tracking-tight">Delete Task</h2>
                    <button id="closeDeleteTaskModal" onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-1 hover:bg-zinc-800 rounded-lg transition-all cursor-pointer group">
                        <img src={closeIcon} className="w-4 h-4 invert opacity-30 group-hover:opacity-100 select-none" alt="Close" />
                    </button>
                </div>

                <p className="text-zinc-400 text-xs mb-6 leading-relaxed font-medium">
                    Are you sure you want to delete the task? This action is irreversible.
                </p>

                <form id="deleteTaskForm" onSubmit={handleSubmit}>
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-widest shadow-lg shadow-red-600/10">
                        Confirm Delete
                    </button>
                </form>
            </div>
        </div>
    )
}
