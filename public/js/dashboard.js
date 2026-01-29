import { currentMonth, currentDay, currentYear, isLeapYear, year } from './getCurrentDate.js'
import { renderCurrentDay, renderCommonDay, renderNoDay, renderCalendarHeader, renderTaskItem, renderWelcomeMessage } from './dashboard.view.js'
import checkSession from './checkSession.js'

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

    const grid = document.querySelector("#grid")

    let day = 0
    let content = ""

    for (let i = 0; i < dayOne; i++) content += renderNoDay()

    for (let i = 0; i < year[month].days; i++) {
        day++

        if (day === currentDay && month === currentMonth && calendarYear === currentYear) content += renderCurrentDay(day)
        else content += renderCommonDay(day)
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