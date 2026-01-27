export function renderCurrentDay(day) {
    return `<div class="bg-indigo-600 aspect-square border border-indigo-400 shadow-lg shadow-indigo-600/50 font-semibold text-sm text-white rounded-lg flex items-center justify-center">${day}</div>`
}

export function renderCommonDay(day) {
    return `<div class="bg-zinc-950/50 aspect-square border border-zinc-800/50 font-semibold text-sm text-zinc-600 rounded-lg flex items-center justify-center">${day}</div>`
}

export function renderCalendarHeader(currentMonth, currentYear) {
    const text = `${currentMonth} ${currentYear}`.toUpperCase()
    return text
}

export function renderGuestHeader() {
    return `<div class="grid grid-cols-2 gap-3 max-md:hidden">

            <a href="/login" class="px-5 py-3 hover:text-indigo-400">Login</a>

            <a href="/signup" class="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-bold px-5 py-3">Sign Up</a>

        </div>`
}

export function renderUserHeader(username) {
    const formattedUsername = username.charAt(0).toUpperCase() + username.slice(1)

    return `<div class="flex items-center gap-6 max-md:hidden">
                <p class="text-zinc-400 text-sm">Welcome, <span class="text-zinc-50 font-semibold">${formattedUsername}</span></p>
                <a href="/users/logout" class="flex items-center justify-center rounded-xl bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 font-bold px-5 py-2.5 text-sm transition-all">
                    Logout
                </a>
            </div>`
}