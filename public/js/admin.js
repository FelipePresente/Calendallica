async function renderMetrics() {
    const users_field = document.querySelector("#users-field")
    const tasks_field = document.querySelector("#tasks-field")

    const response = await fetch('/admin/metrics')
    const metrics = await response.json()

    users_field.innerHTML = metrics.users_data
    tasks_field.innerHTML = metrics.tasks_data
} renderMetrics()