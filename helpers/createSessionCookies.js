export default function createSessionCookies(res, foundUser, token) {
    res.cookie('session-info', JSON.stringify({ username: foundUser.username, id: foundUser._id }), { httpOnly: false, maxAge: 1000 * 60 * 60 * 24 * 14 })
    res.cookie('session-cookie', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 14 })
}