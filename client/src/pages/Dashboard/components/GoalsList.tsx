import { useState } from "react"
import useGoals from "../../../hooks/useGoals.ts"
import toggle from '../../../assets/chevron-down.svg'
import AddGoal from "./AddGoal.tsx"
import Goal from "./Goal.tsx"

export default function GoalsList() {
    const goals = useGoals()
    const [isAdding, setIsAdding] = useState(false)

    const handleAddGoal = () => setIsAdding(true)
    const handleCloseAddGoal = () => setIsAdding(false)

    return (
        <div className="lg:col-span-4 space-y-6">

            {isAdding && <AddGoal onClose={handleCloseAddGoal} />}

            <details open
                className="group w-full bg-zinc-900 border border-zinc-800/50 rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
                <summary
                    className="list-none p-6 bg-zinc-800/30 cursor-pointer hover:bg-zinc-800/50 transition-colors border-b border-zinc-800/50 flex justify-between items-center text-zinc-100">
                    <div>
                        <h2 className="text-base font-bold uppercase tracking-widest">Goals Avaiable</h2>
                        <p className="text-xs text-zinc-500 font-medium uppercase mt-1">
                            {goals.length === 0 ? "No goals defined" :
                                goals.length === 1 ? "1 GOAL DEFINED" :
                                    `${goals.length} GOALS DEFINED`}
                        </p>
                    </div>
                    <div
                        className="w-10 h-10 rounded-full bg-zinc-950/50 flex items-center justify-center border border-zinc-800/50 group-open:rotate-180 transition-transform">
                        <img src={toggle}
                            className="w-4 h-4 invert opacity-50 transition-transform duration-300 group-open:rotate-180 select-none"
                            alt="Toggle" />
                    </div>
                </summary>

                {/* Goals row */}
                <div className="list-type p-5 space-y-4 overflow-y-auto max-h-[600px] bg-zinc-900/40">
                    {goals.map(goal => (<Goal key={goal.id} goal={goal} />))}
                </div>

                <div className="p-5 border-t border-zinc-800/50 bg-zinc-800/10">
                    <button
                        onClick={handleAddGoal}
                        className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-bold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2">
                        <span className="text-lg">+</span> Add Goal
                    </button>
                </div>
            </details>
        </div>
    )
}
