import { currentDate, currentMonth, currentDay, currentYear, isLeapYear, year } from './getCurrentDate.js'
import { renderCurrentDay, renderCommonDay, renderNoDay, renderCalendarHeader, renderTaskItem, renderGoalItem, renderWelcomeMessage, renderAddTaskModal, renderEditTaskModal, renderDeleteTaskModal, renderAddGoalModal, renderEditGoalModal, renderDeleteGoalModal } from './dashboard.view.js'
import checkSession from './checkSession.js'
import getTasks from './getTasks.js'
import getGoals from './getGoals.js'
import ratelimitError from './ratelimitError.js'

const section = document.querySelector("#section")
const grid = document.querySelector("#grid")
const user = checkSession()
const header = document.querySelector("header")
const logo = header.querySelector("a")

if (!user) window.location.href = '/users/logout'

logo.insertAdjacentHTML('afterend', renderWelcomeMessage(user.username))

let month = currentMonth
let calendarYear = currentYear
let dayOne = new Date(calendarYear, month, 1).getDay()

function isDayOne() {
    dayOne = new Date(calendarYear, month, 1).getDay()
    return dayOne
}

async function renderDays() {
    isDayOne()

    const tasks = await getTasks()
    let leapYear = isLeapYear(calendarYear)

    if (leapYear) year[1].days = 29
    else year[1].days = 28

    let day = 0
    let content = ""
    let calendarState = { "month": month, "year": calendarYear }
    const taskDates = new Set(tasks.map(t => t.date.split('T')[0]))

    for (let i = 0; i < dayOne; i++) content += renderNoDay()
    for (let i = 0; i < year[month].days; i++) {
        day++

        const loopDate = new Date(calendarYear, month, day).toLocaleDateString("en-CA")

        const hasTask = taskDates.has(loopDate)

        if (day === currentDay && month === currentMonth && calendarYear === currentYear) content += renderCurrentDay(day, calendarState, hasTask)
        else content += renderCommonDay(day, calendarState, hasTask)
    }

    grid.innerHTML = content
} renderDays()

function writeCalendarHeader() {
    const calendarHeader = document.querySelector("#calendar-header")
    calendarHeader.innerText = renderCalendarHeader(year[month].name, calendarYear)
} writeCalendarHeader()

const previousButton = document.querySelector("#previous")
const nextButton = document.querySelector("#next")

nextButton.onclick = () => {
    if (month >= 0 && month <= 10) month++
    else if (month === 11) calendarYear++, month = 0
    renderDays()
    writeCalendarHeader()
}

previousButton.onclick = () => {
    if (month >= 1 && month <= 11) month--
    else if (month === 0) calendarYear--, month = 11
    renderDays()
    writeCalendarHeader()
}

async function renderTasks() {
    try {
        const tasks = await getTasks()
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date))

        if (!tasks) return

        const taskList = document.querySelector("#task-list")
        const tasksAmount = document.querySelector("#tasks-amount")

        let content = ""

        tasks.forEach(task => {
            content += renderTaskItem(task)
        })

        if (tasks.length !== 0) {
            if (tasks.length === 1) tasksAmount.innerText = `${tasks.length} TASK SCHEDULED`
            else tasksAmount.innerText = `${tasks.length} TASKS SCHEDULED`
        }

        taskList.innerHTML = content
    } catch (error) {
        console.log("Error trying to fetch tasks")
    }
} renderTasks()

async function renderGoals() {
    try {
        const goals = await getGoals()
        goals.sort((a, b) => new Date(a.date) - new Date(b.date))

        if (!goals) return

        const goalList = document.querySelector("#goal-list")
        const goalsAmount = document.querySelector("#goals-amount")

        let content = ""

        goals.forEach(goal => {
            content += renderGoalItem(goal)
        })

        if (goals.length !== 0) {
            if (goals.length === 1) goalsAmount.innerText = `${goals.length} GOAL DEFINED`
            else goalsAmount.innerText = `${goals.length} GOALS DEFINED`
        }

        goalList.innerHTML = content
    } catch (error) {
        console.log("Error trying to fetch goals")
    }
} renderGoals()

// Render tasks and goals modals and redirect
section.addEventListener('click', (event) => {
    const addTaskCell = event.target.closest(".day-cell")
    const editTaskCell = event.target.closest('.edit-cell')
    const deleteTaskCell = event.target.closest('.delete-cell')
    const taskCell = event.target.closest('.task-cell')

    const addGoalBtn = event.target.closest("#addGoalBtn")
    const editGoalCell = event.target.closest('.edit-goal')
    const deleteGoalCell = event.target.closest('.delete-goal')

    const isButton = event.target.closest('button')

    if (addTaskCell) {
        const { day, month, year } = addTaskCell.dataset

        const selectedDate = new Date(year, month, day)
        const maxDate = currentDate.setHours(0, 0, 0, 0)

        if (selectedDate >= maxDate) {
            section.insertAdjacentHTML('afterbegin', renderAddTaskModal(selectedDate))
        }
    } else if (editTaskCell) {
        const { date, title, description, taskId } = editTaskCell.dataset

        const selectedDate = new Date(date)

        section.insertAdjacentHTML('afterbegin', renderEditTaskModal(selectedDate, title, description, taskId))
    } else if (deleteTaskCell) {
        const { taskId } = deleteTaskCell.dataset

        section.insertAdjacentHTML('afterbegin', renderDeleteTaskModal(taskId))
    } else if (taskCell && !isButton) {
        const { date } = taskCell.dataset

        const targetDate = new Date(date)

        calendarYear = targetDate.getFullYear()
        month = targetDate.getMonth()

        renderDays()
        writeCalendarHeader()
    } else if (addGoalBtn) {
        section.insertAdjacentHTML('afterbegin', renderAddGoalModal())
    } else if (editGoalCell) {
        const { title, description, goalId } = editGoalCell.dataset
        section.insertAdjacentHTML('afterbegin', renderEditGoalModal(title, description, goalId))
    } else if (deleteGoalCell) {
        const { goalId } = deleteGoalCell.dataset
        section.insertAdjacentHTML('afterbegin', renderDeleteGoalModal(goalId))
    }
})

// Close tasks and goals modals
section.addEventListener('click', (event) => {
    if (event.target.closest("#closeAddTaskModal")) document.querySelector("#addTaskModal").remove()
    if (event.target.id === "addTaskModal") event.target.remove()

    if (event.target.closest("#closeEditTaskModal")) document.querySelector("#editTaskModal").remove()
    if (event.target.id === "editTaskModal") event.target.remove()

    if (event.target.closest("#closeDeleteTaskModal")) document.querySelector("#deleteTaskModal").remove()
    if (event.target.id === "deleteTaskModal") event.target.remove()

    if (event.target.closest("#closeAddGoalModal")) document.querySelector("#addGoalModal").remove()
    if (event.target.id === "addGoalModal") event.target.remove()

    if (event.target.closest("#closeEditGoalModal")) document.querySelector("#editGoalModal").remove()
    if (event.target.id === "editGoalModal") event.target.remove()

    if (event.target.closest("#closeDeleteGoalModal")) document.querySelector("#deleteGoalModal").remove()
    if (event.target.id === "deleteGoalModal") event.target.remove()
})

// Submit tasks and goals forms
section.addEventListener('submit', async (event) => {
    if (event.target.id === "addTaskForm") {
        event.preventDefault()

        const form = event.target

        const title = form.querySelector("#task-title").value
        const description = form.querySelector("#task-description").value
        const date = form.querySelector("#task-date").value

        if (!title || !description || !date) return

        try {
            const response = await fetch(`/tasks`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    title,
                    description
                })
            })

            if (await ratelimitError(response)) return
        } catch (error) {
            console.log("Error trying to create task")
        }

        window.location.reload()
    }
    if (event.target.id === "editTaskForm") {
        event.preventDefault()

        const form = event.target

        const date = form.querySelector("#task-date").value
        const title = form.querySelector("#task-title").value
        const description = form.querySelector("#task-description").value
        const taskId = form.querySelector("#task-id").value

        if (!date || !title || !description || !taskId) return

        try {
            const response = await fetch(`/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    title,
                    description
                })
            })

            if (await ratelimitError(response)) return
        } catch (error) {
            console.log("Error trying to edit task")
        }

        window.location.reload()
    }
    if (event.target.id === "deleteTaskForm") {
        event.preventDefault()

        const form = event.target

        const taskId = form.querySelector("#task-id").value

        try {
            const response = await fetch(`/tasks/${taskId}`, {
                method: 'DELETE'
            })

            if (await ratelimitError(response)) return
        } catch (error) {
            console.log("Error trying to delete task")
        }

        window.location.reload()
    }
    if (event.target.id === "addGoalForm") {
        event.preventDefault()

        const form = event.target

        const title = form.querySelector("#goal-title").value
        const description = form.querySelector("#goal-description").value

        if (!title || !description) return

        try {
            const response = await fetch(`/goals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description
                })
            })

            if (await ratelimitError(response)) return
        } catch (error) {
            console.log("Error trying to create goal")
        }

        window.location.reload()
    }
    if (event.target.id === "editGoalForm") {
        event.preventDefault()

        const form = event.target

        const title = form.querySelector("#goal-title").value
        const description = form.querySelector("#goal-description").value
        const goalId = form.querySelector("#goal-id").value

        if (!title || !description || !goalId) return

        try {
            const response = await fetch(`/goals/${goalId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description
                })
            })

            if (await ratelimitError(response)) return
        } catch (error) {
            console.log("Error trying to edit goal")
        }

        window.location.reload()
    }
    if (event.target.id === "deleteGoalForm") {
        event.preventDefault()

        const form = event.target

        const goalId = form.querySelector("#goal-id").value

        try {
            const response = await fetch(`/goals/${goalId}`, {
                method: 'DELETE'
            })

            if (await ratelimitError(response)) return
        } catch (error) {
            console.log("Error trying to delete goal")
        }

        window.location.reload()
    }
})
