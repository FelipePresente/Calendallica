export interface cardProps {
    color: "indigo" | "emerald" | "purple",
    icon: string,
    title: string,
    description: string
}

const colors = {
    indigo: {
        bg: "bg-indigo-600/10",
        border: "hover:border-indigo-900"
    },
    emerald: {
        bg: "bg-emerald-600/10",
        border: "hover:border-emerald-900"
    },
    purple: {
        bg: "bg-purple-600/10",
        border: "hover:border-purple-900"
    }
}

export default function Card({ color, icon, title, description }: cardProps) {
    return (
        <div className={`bg-zinc-900 p-10 rounded-4xl border border-zinc-800 max-w-90 transition-colors ${colors[color].border}`}>

            <div className={`flex justify-center items-center w-15 rounded-xl p-4 ${colors[color].bg}`}>
                <img src={icon} className="w-10 invert" alt={title} />
            </div>

            <div className="mt-5">
                <h3 className="text-2xl mb-3 font-bold">{title}</h3>
                <p className="text-lg text-zinc-400">{description}</p>
            </div>

        </div>
    )
}