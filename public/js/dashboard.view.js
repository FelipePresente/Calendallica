export function renderCurrentDay(day, calendarState) {
    return `<div class="day-cell bg-indigo-600 hover:border-transparent cursor-pointer aspect-square border border-indigo-400 shadow-lg shadow-indigo-600/50 font-semibold text-sm text-white rounded-lg flex items-center justify-center" data-day="${day}" data-month="${calendarState.month}" data-year="${calendarState.year}">${day}</div>`
}

export function renderCommonDay(day, calendarState) {
    return `<div class="day-cell bg-zinc-950/50 hover:border-zinc-700 cursor-pointer aspect-square border border-zinc-800/50 font-semibold text-sm text-zinc-600 rounded-lg flex items-center justify-center" data-day="${day}" data-month="${calendarState.month}" data-year="${calendarState.year}">${day}</div>`
}

export function renderNoDay() {
    return `<div class="bg-zinc-950/20 border border-zinc-800/50 aspect-square rounded-lg"></div>`
}

export function renderCalendarHeader(currentMonth, currentYear) {
    const text = `${currentMonth} ${currentYear}`.toUpperCase()
    return text
}

export function renderTaskItem(task) {
    const taskDate = new Date(task.date)

    const weekday = taskDate.toLocaleDateString('en-US', { weekday: 'long' })
    const year = taskDate.getFullYear()
    const month = taskDate.toLocaleString('en-US', { month: 'short' })
    const day = taskDate.getDate()

    const formattedDate = `${year} ${month} ${day} ${weekday}`

    return `<div class="p-5 bg-zinc-950/20 border border-zinc-800/40 rounded-xl hover:border-zinc-700 transition-all shadow-sm group/item relative">
                <div class="flex justify-between items-start mb-2">
                    <span class="text-[9px] font-black text-zinc-600 uppercase tracking-widest">${formattedDate}</span>
                    <div class="flex gap-2 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button class="edit-cell flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer" title="Edit" data-date="${task.date}" data-title="${task.title}" data-description="${task.description}" data-task-id="${task._id}">
                            <img src="../icons/edit.svg" class="w-3.5 h-3.5 invert opacity-50" alt="Edit">
                        </button>
                        <button class="delete-cell flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900/50 hover:bg-zinc-800 border border-zinc-800 hover:border-red-900/50 group transition-all cursor-pointer" title="Delete" data-task-id="${task._id}">
                            <img src="../icons/delete.svg" class="w-3.5 h-3.5 invert opacity-50 group-hover:text-red-400" alt="Delete">
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

export function renderAddTaskModal(dateObj) {
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
    <div id="addTaskModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
        <div class="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl shadow-2xl p-10 relative overflow-hidden">
        
            <div class="flex justify-between items-start mb-10">
                <div>
                    <h2 class="text-3xl font-black text-white tracking-tight">New Task</h2>
                    <p class="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">${formattedDate}</p>
                </div>

                <button id="closeAddTaskModal" class="p-2 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer group">
                    <img src="../icons/close.svg" class="w-5 h-5 invert opacity-30 group-hover:opacity-100" alt="Close">
                </button>
            </div>
            
            <form id="addTaskForm" class="space-y-8">
                <div class="flex flex-col gap-2">
                    <input type="text" id="task-title" placeholder="Title" 
                        class="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-indigo-600 transition-all font-bold text-lg"
                        required autofocus>
                </div>
                
                <div class="flex flex-col gap-2">
                    <textarea id="task-description" placeholder="Description" rows="3" 
                        class="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-indigo-600 transition-all resize-none font-medium"
                        required></textarea>
                </div>
                
                <input type="hidden" id="task-date" value="${dateObj.toISOString()}">
                
                <button type="submit" class="w-full bg-white hover:bg-zinc-200 text-black font-black py-5 rounded-2xl transition-all cursor-pointer text-base uppercase tracking-widest shadow-xl shadow-white/5">
                    Confirm Task
                </button>
            </form>
        </div>
    </div>`
}

export function renderEditTaskModal(dateObj, title, description, taskId) {
    const formattedDate = dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return `
    <div id="editTaskModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
        <div class="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-2xl shadow-2xl p-10 relative overflow-hidden">
        
            <div class="flex justify-between items-start mb-10">
                <div>
                    <h2 class="text-3xl font-black text-white tracking-tight">New Task</h2>
                    <p class="text-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] mt-2">${formattedDate}</p>
                </div>

                <button id="closeEditTaskModal" class="p-2 hover:bg-zinc-800 rounded-2xl transition-all cursor-pointer group">
                    <img src="../icons/close.svg" class="w-5 h-5 invert opacity-30 group-hover:opacity-100" alt="Close">
                </button>
            </div>
            
            <form id="editTaskForm" class="space-y-8">
                <div class="flex flex-col gap-2">
                    <input type="text" id="task-title" value="${title}" placeholder="Title" 
                        class="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-700 outline-none focus:border-indigo-600 transition-all font-bold text-lg"
                        required autofocus>
                </div>
                
                <div class="flex flex-col gap-2">
                    <textarea id="task-description" placeholder="Description" rows="3" 
                        class="w-full bg-zinc-950 border-2 border-zinc-800 rounded-2xl px-6 py-4 text-zinc-100 placeholder:text-zinc-700 outline-none focus:border-indigo-600 transition-all resize-none font-medium"
                        required>${description}</textarea>
                </div>
                
                <input type="hidden" id="task-date" value="${dateObj.toISOString()}">

                <input type="hidden" id="task-id" value="${taskId}">
                
                <button type="submit" class="w-full bg-white hover:bg-zinc-200 text-black font-black py-5 rounded-2xl transition-all cursor-pointer text-base uppercase tracking-widest shadow-xl shadow-white/5">
                    Confirm Task
                </button>
            </form>
        </div>
    </div>`
}

export function renderDeleteTaskModal(taskId) {
    return `
    <div id="deleteTaskModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
        <div class="bg-zinc-900 border border-zinc-800 w-full max-w-[320px] rounded-2xl shadow-2xl p-6 relative overflow-hidden">
            
            <div class="flex justify-between items-start mb-4">
                <h2 class="text-lg font-black text-white tracking-tight">Delete Task</h2>
                <button id="closeDeleteTaskModal" class="p-1 hover:bg-zinc-800 rounded-lg transition-all cursor-pointer group">
                    <img src="../icons/close.svg" class="w-4 h-4 invert opacity-30 group-hover:opacity-100" alt="Close">
                </button>
            </div>

            <p class="text-zinc-400 text-xs mb-6 leading-relaxed font-medium">
                Are you sure you want to delete the task? This action is irreversible.
            </p>
            
            <form id="deleteTaskForm">
                <input type="hidden" id="task-id" value="${taskId}">
                <button type="submit" class="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all cursor-pointer text-xs uppercase tracking-widest shadow-lg shadow-red-600/10">
                    Confirm Delete
                </button>
            </form>
        </div>
    </div>`
}