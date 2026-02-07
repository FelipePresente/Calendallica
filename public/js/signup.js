import ratelimitError from "./ratelimitError.js"

const signupForm = document.querySelector("#signupForm")

signupForm.addEventListener("submit", async function (e) {
    e.preventDefault()

    const submitButton = document.querySelector("#submit-button")
    submitButton.disabled = true

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

    if (await ratelimitError(response)) return submitButton.disabled = false

    if (!response.ok) {
        submitButton.disabled = false
        const errorText = await response.text()

        const body = document.querySelector("body")
        const errorMessage = document.querySelector("#error-message")

        if (errorMessage) errorMessage.remove()

        body.insertAdjacentHTML("afterbegin", `<div id="error-message"
        class="left-0 -top-16 text-center py-3 px-5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl font-medium">
        ${errorText}
        </div>`)
        return
    }
    window.location.href = '/dashboard'
})