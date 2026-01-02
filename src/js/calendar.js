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

for (let i = 0; i < months.length; i++) {
    const stored = localStorage.getItem(`notes${i}`)
    if (stored) {
        months[i].data = JSON.parse(stored)
    }
}

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
        calendar.innerHTML += `<div class="w-full aspect-square bg-stone-800/40 hover:bg-stone-800 hover:scale-[1.03] transition-all duration-200 rounded-xl flex justify-center items-center cursor-pointer border border-stone-700/30 hover:border-stone-500 hover:shadow-lg group relative" onclick ="saveNotes(${currentMonth}, ${day - 1})">
            <span class="text-lg sm:text-xl font-bold text-stone-600 group-hover:text-stone-300 transition-colors">${day}</span>
        </div>`
    }
} renderDays()

function saveNotes(month, note) {
    const target = months[month].data
    textInput.classList.remove('hidden')

    if (target !== undefined && target[note] !== undefined) {
        textInput.value = target[note]
    } else if (target[note] === undefined) {
        textInput.value = ""
    }

    textInput.oninput = function () {
        target[note] = textInput.value
        localStorage.setItem(`notes${month}`, JSON.stringify(target))
    }
}

console.log(localStorage.notes0)