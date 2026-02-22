import Logo from "./Logo.tsx"

/**
 * DashboardSkeleton
 * Versão refinada com animações mais sutis e elegantes.
 */
export default function DashboardSkeleton() {
    return (
        <div className="min-h-screen bg-zinc-950 overflow-hidden select-none">
            {/* Header Skeleton */}
            <header className="fixed w-full h-25 py-3 px-6 lg:px-100 flex justify-between items-center z-10 border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md">
                <div className="opacity-20 grayscale">
                    <Logo className="w-30" />
                </div>

                <div className="flex items-center gap-4 md:gap-6">
                    <div className="h-3 w-24 bg-zinc-900 rounded-full hidden md:block animate-pulse"></div>
                    <div className="h-10 w-24 bg-zinc-900 border border-zinc-800/50 rounded-xl shadow-inner animate-pulse"></div>
                </div>
            </header>

            {/* Main Content Skeleton */}
            <main className="pt-25 min-h-screen w-full relative">
                {/* Efeito visual de fundo mais estático */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-zinc-900/10 blur-[120px] rounded-full -z-10"></div>

                <section className="grid grid-cols-1 lg:grid-cols-16 gap-8 items-start max-w-screen-2xl mx-auto p-6 lg:p-10">

                    {/* 1. Tasks List Skeleton */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="w-full bg-zinc-900/50 border border-zinc-800/40 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                            <div className="p-6 bg-zinc-800/20 border-b border-zinc-800/40 flex justify-between items-center">
                                <div className="space-y-3">
                                    <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse"></div>
                                    <div className="h-2 w-36 bg-zinc-800/40 rounded animate-pulse"></div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-zinc-950/50 border border-zinc-800/40 animate-pulse"></div>
                            </div>
                            <div className="p-5 space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-24 w-full bg-zinc-800/10 rounded-xl border border-zinc-800/20 animate-pulse [animation-delay:200ms]"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. Goals List Skeleton */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="w-full bg-zinc-900/50 border border-zinc-800/40 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm">
                            <div className="p-6 bg-zinc-800/20 border-b border-zinc-800/40 flex justify-between items-center">
                                <div className="space-y-3">
                                    <div className="h-4 w-28 bg-zinc-800 rounded animate-pulse"></div>
                                    <div className="h-2 w-36 bg-zinc-800/40 rounded animate-pulse"></div>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-zinc-950/50 border border-zinc-800/40 animate-pulse"></div>
                            </div>
                            <div className="p-5 space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="h-16 w-full bg-zinc-800/10 rounded-xl border border-zinc-800/20 animate-pulse [animation-delay:400ms]"></div>
                                ))}
                            </div>
                            <div className="p-5 border-t border-zinc-800/40 bg-zinc-800/5">
                                <div className="h-12 w-full bg-zinc-800/30 rounded-xl border border-zinc-800/40 animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Calendar Skeleton */}
                    <div className="lg:col-span-8 bg-zinc-900/50 border border-zinc-800/40 rounded-3xl p-6 lg:p-8 shadow-2xl backdrop-blur-sm">
                        {/* Header do Calendário */}
                        <div className="flex items-center justify-between mb-10 border-b border-zinc-800/60 pb-8">
                            <div className="w-10 h-10 bg-zinc-800/40 rounded-xl border border-zinc-800/20 animate-pulse"></div>
                            <div className="h-5 w-40 bg-zinc-800 rounded-lg animate-pulse"></div>
                            <div className="w-10 h-10 bg-zinc-800/40 rounded-xl border border-zinc-800/20 animate-pulse"></div>
                        </div>

                        {/* Dias da Semana */}
                        <div className="grid grid-cols-7 gap-4 mb-6">
                            {[...Array(7)].map((_, i) => (
                                <div key={i} className="h-2 w-10 bg-zinc-800/40 mx-auto rounded animate-pulse"></div>
                            ))}
                        </div>

                        {/* Grade de Dias */}
                        <div className="grid grid-cols-7 gap-4">
                            {Array.from({ length: 35 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square w-full bg-zinc-800/5 rounded-2xl border border-zinc-800/10 shadow-sm animate-pulse"
                                    style={{ animationDelay: `${i * 30}ms` }}
                                ></div>
                            ))}
                        </div>
                    </div>

                </section>
            </main>
        </div>
    )
}