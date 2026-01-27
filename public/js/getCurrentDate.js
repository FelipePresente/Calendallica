export const currentDate = new Date()
export const currentMonth = currentDate.getMonth()
export const currentDay = currentDate.getDate()
export const currentYear = currentDate.getFullYear()

export function isLeapYear(year) {
    const leapYear = new Date(year, 1, 29)
    return leapYear.getMonth() === 1
}

export let year = [
    { name: "January", days: 31 },
    { name: "February", days: 28 },
    { name: "March", days: 31 },
    { name: "April", days: 30 },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    { name: "August", days: 31 },
    { name: "September", days: 30 },
    { name: "October", days: 31 },
    { name: "November", days: 30 },
    { name: "December", days: 31 }
]