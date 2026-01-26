const loginForm = document.querySelector("#loginForm")

loginForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const username = document.querySelector("#login-username").value
    const password = document.querySelector("#login-password").value

    const response = await fetch('/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password
        })
    })

    if (!response.ok) {
        const errorText = await response.text()
        alert(errorText)
        return
    }

    window.location.href = '/'
})