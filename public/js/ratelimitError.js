export default async function ratelimitError(response) {
    if (response.status === 429) {
        const data = await response.json()
        alert(data.message)
        return true
    }

    return false
}
