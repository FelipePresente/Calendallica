import { currentDate, currentMonth, currentDay, currentYear, isLeapYear, year } from './getCurrentDate.js'
import { renderCurrentDay, renderCommonDay, renderCalendarHeader, renderGuestHeader, renderUserHeader } from './home.view.js'
import checkSession from './checkSession.js'

const leapYear = isLeapYear(currentYear)

if (leapYear) year[1].days = 29
else year[1].days = 28

function renderDays() {
    const grid = document.querySelector("#grid")

    let day = 0

    for (let i = 0; i < year[currentMonth].days; i++) {
        day++

        if (day === currentDay) grid.innerHTML += renderCurrentDay(day)
        if (day !== currentDay) grid.innerHTML += renderCommonDay(day

        )
    }
} renderDays()

function writeCalendarHeader() {
    const calendarHeader = document.querySelector("#calendar-header")
    calendarHeader.innerText = renderCalendarHeader(year[currentMonth].name, currentYear)
} writeCalendarHeader()

function writeUserHeader() {
    const header = document.querySelector("header")

    const user = checkSession()

    if (!user) return header.innerHTML += renderGuestHeader()

    header.innerHTML += renderUserHeader(user.username)
} writeUserHeader()