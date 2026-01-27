const signupForm = document.querySelector("#signupForm")

signupForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const username = document.querySelector("#signup-username").value
    const password = document.querySelector("#signup-password").value
    const passwordConfirmation = document.querySelector("#password-confirmation").value

    const response = await fetch('/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username,
            password,
            passwordConfirmation
        })
    })

    if (!response.ok) {
        const errorText = await response.text()
        alert(errorText)
        return
    }
    window.location.href = '/'
})