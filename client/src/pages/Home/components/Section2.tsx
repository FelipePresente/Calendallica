import Card from './Card.tsx'
import calendar from '../../../assets/calendar.svg'
import tasks from '../../../assets/tasks.svg'
import theme from '../../../assets/theme.svg'

export default function Section2() {
    return (
        <section id="section2" className="py-25 w-full bg-zinc-900/30">
            <h2 className="text-center text-4xl font-bold">Everything you need</h2>

            <p className="text-center text-lg text-zinc-400 mt-5">Powerful tools designed to simplify your daily routine.</p>

            {/* Grid */}
            <div className="mt-25 grid grid-rows-3 lg:grid-rows-1 lg:grid-cols-3 gap-12 px-6 place-self-center">

                <Card color="indigo" title="Smart Calendar" description="Organize your demands by date with the fastest grid interface you've ever used." icon={calendar} />
                <Card color="emerald" title="Task Management" description="Don't lose sight of anything. Create tasks and goals to get your stuff done." icon={tasks} />
                <Card color="purple" title="Light & Dark Mode WIP" description="Choose the experience that fits your flow. Optimized for both deep focus and bright clarity." icon={theme} />

            </div>
        </section>
    )
}