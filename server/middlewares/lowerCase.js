export default function lowerCase(req, res, next) {
    const data = req.body
    const safeFields = ['username', 'email']

    for (const key in data) {
        if (typeof data[key] === 'string' && safeFields.includes(key)) {
            data[key] = data[key].toLowerCase()
        }
    }
    next()
}