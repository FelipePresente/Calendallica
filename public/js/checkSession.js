import getCookie from "./getCookie.js"

export default function checkSession() { 
    const loggedUserCookie = getCookie('session-info')

    let user = null

    if (!loggedUserCookie) return null

        try {
            user = JSON.parse(decodeURIComponent(loggedUserCookie))
        } catch (error) {
            console.error("Error parsing cookie")
        }

    return user
}