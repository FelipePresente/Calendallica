export function renderCurrentDay(day) {
    return `<div class="bg-indigo-600 aspect-square border border-indigo-400 shadow-lg shadow-indigo-600/50 font-semibold text-sm text-white rounded-lg flex items-center justify-center">${day}</div>`
}

export function renderCommonDay(day) {
    return `<div class="bg-zinc-950/50 aspect-square border border-zinc-800/50 font-semibold text-sm text-zinc-600 rounded-lg flex items-center justify-center">${day}</div>`
}

export function renderNoDay() {
    return `<div class="bg-zinc-950/20 border border-zinc-800/50 aspect-square rounded-lg"></div>`
}

export function renderCalendarHeader(currentMonth, currentYear) {
    const text = `${currentMonth} ${currentYear}`.toUpperCase()
    return text
}

export function renderTaskItem(task) {
    return `<div class="p-5 bg-zinc-950/20 border border-zinc-800/40 rounded-xl hover:border-zinc-700 transition-all shadow-sm group/item relative">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[9px] font-black text-zinc-600 uppercase tracking-widest">${task.date}</span>
                    <div class="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button class="text-zinc-500 hover:text-white transition-colors cursor-pointer" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                        </button>
                        <button class="text-zinc-500 hover:text-red-400 transition-colors cursor-pointer" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
                <h4 class="text-sm font-bold text-zinc-100">${task.title}</h4>
                <p class="text-xs text-zinc-500 mt-1 leading-relaxed">${task.description}</p>
            </div>`
}

export function renderWelcomeMessage(username) {
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1)

    return `<div class="flex items-center gap-6 max-md:hidden">
                <p class="text-zinc-400 text-sm">Welcome, <span class="text-zinc-50 font-semibold">${formattedUsername}</span></p>
                <a href="/users/logout" class="flex items-center justify-center rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 font-bold px-5 py-2.5 text-sm transition-all">
                    Logout
                </a>
            </div>`
}
