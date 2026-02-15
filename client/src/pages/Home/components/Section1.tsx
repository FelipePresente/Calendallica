import { Link } from "react-router-dom"
import Logo from "../../../components/Logo.tsx"
import arrowRight from '../../../assets/arrow-right.svg'
import Orb1 from "../../../components/Orb1.tsx"
import CalendarPreview from "./CalendarPreview.tsx"

export default function Section1() {
    return (
        <section className="py-35 w-full relative">
            <Orb1 />

            {/* Grid */}
            <div
                className="h-full w-full p-5 grid grid-rows-2 md:grid-rows-1 md:grid-cols-2 gap-25 max-w-330 place-self-center">

                <div className="flex flex-col justify-center items-center text-center">
                    <Logo
                        className="w-64 md:w-80 mb-6 group-hover:scale-105 transition-transform duration-500" />

                    <h1
                        className="text-4xl md:text-5xl font-black bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent leading-tight mb-6">
                        Master your time<br />with precision.
                    </h1>

                    <p className="text-zinc-400 text-lg md:text-xl max-w-md leading-relaxed">
                        The perfect blend between a visual calendar and your to-do list.
                        Simple, fast and focused on what matters.
                    </p>

                    <div className="mt-12 flex flex-col items-center gap-4">
                        <Link to="/signup"
                            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl bg-indigo-600 px-16 py-6 font-black text-white transition-all duration-300 hover:bg-indigo-500 hover:ring-6 hover:ring-indigo-600/20 active:scale-95 shadow-2xl shadow-indigo-600/30">
                            <span className="relative z-10 flex items-center gap-2 text-lg uppercase tracking-widest">
                                Get Started
                                <img src={arrowRight}
                                    className="w-4 invert transition-transform duration-300 group-hover:translate-x-1.5"
                                    alt="Arrow Right" />
                            </span>

                            <div
                                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full transition-transform duration-1000 group-hover:translate-x-full">
                            </div>
                        </Link>

                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
                            No credit card required
                        </p>
                    </div>
                </div>

                {/* aqui */}

                <CalendarPreview />
            </div>
        </section>
    )
}