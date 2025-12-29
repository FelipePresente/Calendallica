const calendar = document.querySelector("#calendar")
const month = document.querySelector("#month")
const previous = document.querySelector("#previous")
const next = document.querySelector("#next")
const textInput = document.querySelector("#textInput")

let months = [
    {
        "name": "January",
        "days": 31,
        "data": []
    },
    {
        "name": "February",
        "days": 28,
        "data": []
    },
    {
        "name": "March",
        "days": 31,
        "data": []
    },
    {
        "name": "April",
        "days": 30,
        "data": []
    },
    {
        "name": "May",
        "days": 31,
        "data": []
    },
    {
        "name": "June",
        "days": 30,
        "data": []
    },
    {
        "name": "July",
        "days": 31,
        "data": []
    },
    {
        "name": "August",
        "days": 31,
        "data": []
    },
    {
        "name": "September",
        "days": 30,
        "data": []
    },
    {
        "name": "October",
        "days": 31,
        "data": []
    },
    {
        "name": "November",
        "days": 30,
        "data": []
    },
    {
        "name": "December",
        "days": 31,
        "data": []
    }
]

let currentMonth = 0
let day = 0

function changeMonth(count) {
    month.innerHTML = months[count].name
} changeMonth(currentMonth)

previous.addEventListener("click", function () {
    if (currentMonth > 0) {
        currentMonth--
    }
    changeMonth(currentMonth)
    renderDays()
})

next.addEventListener("click", function () {
    if (currentMonth < 11) {
        currentMonth++
    }
    changeMonth(currentMonth)
    renderDays()
})

function renderDays() {
    day = 0
    calendar.innerHTML = ""
    for (let i = 0; i < months[currentMonth].days; i++) {
        day++
        calendar.innerHTML += `<div class="w-full aspect-square bg-stone-800/40 hover:bg-stone-800 hover:scale-[1.03] transition-all duration-200 rounded-lg flex flex-col p-3 cursor-pointer border border-stone-700/30 hover:border-stone-500 hover:shadow-lg group relative" onclick="openNote(${day})">
            <span class="text-xl font-bold text-stone-600 group-hover:text-stone-300 transition-colors self-end">${day}</span>
        </div>`
    }
} renderDays()

let selectedDay = 0

function openNote(noteDay) {
    selectedDay = noteDay
    textInput.classList.remove('hidden')
    let storedNotes = localStorage.getItem('notes_' + currentMonth)
    if (storedNotes) {
        let notesArray = storedNotes.split(',')
        months[currentMonth].data = notesArray
        textInput.value = notesArray[selectedDay - 1] || ""
    } else {
        textInput.value = months[currentMonth].data[selectedDay - 1] || ""
    }
}

textInput.oninput = function () {
    months[currentMonth].data[selectedDay - 1] = textInput.value
    localStorage.setItem('notes_' + currentMonth, months[currentMonth].data)
}