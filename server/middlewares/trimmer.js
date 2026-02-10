export default function trimData(req, res, next) {
    let data = req.body
    const skipFields = ['password', 'passwordConfirmation']

    for (const key in data) {
        if (!req.body) return next()

        if (typeof data[key] === 'string' && !skipFields.includes(key)) data[key] = data[key].trim()
    }
    next()
}