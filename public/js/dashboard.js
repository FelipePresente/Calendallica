import { currentMonth, currentDay, currentYear, isLeapYear, year } from './getCurrentDate.js'
import { renderCurrentDay, renderCommonDay, renderNoDay, renderCalendarHeader, renderTaskItem, renderWelcomeMessage, renderAddTaskModal, renderEditTaskModal } from './dashboard.view.js'
import checkSession from './checkSession.js'

const section = document.querySelector("#section")
const grid = document.querySelector("#grid")
const user = checkSession()
const header = document.querySelector("header")
const logo = header.querySelector("a")

logo.insertAdjacentHTML('afterend', renderWelcomeMessage(user.username))

let month = currentMonth
let calendarYear = currentYear
let dayOne = new Date(calendarYear, month, 1).getDay()

function isDayOne() {
    dayOne = new Date(calendarYear, month, 1).getDay()
    return dayOne
}

function renderDays() {
    isDayOne()

    let leapYear = isLeapYear(calendarYear)

    if (leapYear) year[1].days = 29
    else year[1].days = 28

    let day = 0
    let content = ""
    let calendarState = { "month": month, "year": calendarYear }

    for (let i = 0; i < dayOne; i++) content += renderNoDay()
    for (let i = 0; i < year[month].days; i++) {
        day++

        if (day === currentDay && month === currentMonth && calendarYear === currentYear) content += renderCurrentDay(day, calendarState)
        else content += renderCommonDay(day, calendarState)
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
        const response = await fetch(`/tasks/${user.id}`)
        const tasks = await response.json()
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date))

        if (!tasks) return

        const taskList = document.querySelector("#task-list")

        let content = ""

        tasks.forEach(task => {
            content += renderTaskItem(task)
        })

        taskList.innerHTML = content
    } catch (error) {
        console.log("Error trying to fetch tasks")
    }
} renderTasks()

// Render add task modal
grid.addEventListener('click', (event) => {
    const cell = event.target.closest(".day-cell")

    if (cell) {
        const { day, month, year } = cell.dataset

        const selectedDate = new Date(year, month, day)

        section.insertAdjacentHTML('afterbegin', renderAddTaskModal(selectedDate))
    }
})

// Close add task modal
section.addEventListener('click', (event) => {
    if (event.target.closest("#closeAddTaskModal")) document.querySelector("#addTaskModal").remove()
    if (event.target.id === "addTaskModal") event.target.remove()
})

// Submit add task form
section.addEventListener('submit', async (event) => {
    if (event.target.id === "addTaskForm") {
        event.preventDefault()

        const form = event.target

        const title = form.querySelector("#task-title").value
        const description = form.querySelector("#task-description").value
        const date = form.querySelector("#task-date").value
        const id = user.id

        if (!title || !description || !date || !id) return

        try {
            const response = await fetch(`/tasks/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    title,
                    description
                })
            })

            window.location.reload()
        } catch (error) {
            console.log("Error trying to create task")
        }
    }
})

// Render edit task modal
section.addEventListener('click', (event) => {
    const cell = event.target.closest('.edit-cell')

    if (cell) {
        const { date, title, description, taskId } = cell.dataset

        const selectedDate = new Date(date)

        section.insertAdjacentHTML('afterbegin', renderEditTaskModal(selectedDate, title, description, taskId))
    }
})

// Close edit task modal
section.addEventListener('click', (event) => {
    if (event.target.closest("#closeEditTaskModal")) document.querySelector("#editTaskModal").remove()
    if (event.target.id === "editTaskModal") event.target.remove()
})

// Submit edit task form
section.addEventListener('submit', async (event) => {
    if (event.target.id === "editTaskForm") {
        event.preventDefault()

        const form = event.target

        const date = form.querySelector("#task-date").value
        const title = form.querySelector("#task-title").value
        const description = form.querySelector("#task-description").value
        const taskId = form.querySelector("#task-id").value
        const id = user.id

        if (!date || !title || !description || !id || !taskId) return

        try {
            const response = await fetch(`/tasks/${taskId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    date,
                    title,
                    description,
                    userId: id
                })
            })

            window.location.reload()
        } catch (error) {
            console.log("Error trying to edit task")
        }
    }
})