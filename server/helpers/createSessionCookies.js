export default function createSessionCookies(res, createdUser, token) {
    const cookieOptions = {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        secure: true,
        sameSite: 'none'
    }

    res.cookie('session-info', JSON.stringify({ username: createdUser.username }), { ...cookieOptions, httpOnly: false })
    res.cookie('session-cookie', token, { ...cookieOptions, httpOnly: true })
}