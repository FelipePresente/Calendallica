export default function userVerification(res, username, password) {
    if (!username || !password) return res.status(400).json({ message: "All fields must be filled" }) || true
    if (username.length < 4) return res.status(400).json({ message: "Username minimum number of characters is 4" }) || true
    if (username.length > 12) return res.status(400).json({ message: "Username maximum number of characters is 12" }) || true
    if (password.length < 8) return res.status(400).json({ message: "Password minimum number of characters is 8" }) || true
    if (password.length > 35) return res.status(400).json({ message: "Password maximum number of characters is 35" }) || true
    if (password.includes(" ")) return res.status(400).json({ message: "Password must not include spaces" })

    return false
}