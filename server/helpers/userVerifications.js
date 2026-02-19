export default function userVerification(res, username, password) {
    if (!username || !password) return res.status(400).json({ message: "Please fill in all required fields" }) || true

    const forbiddenChars = /[<>"'/\\()[\]{}|&]/
    if (forbiddenChars.test(username)) {
        return res.status(400).json({ message: "Username contains invalid characters" }) || true
    }
    if (username.includes(" ")) return res.status(400).json({ message: "Username cannot contain spaces" })

    if (username.length < 4) return res.status(400).json({ message: "Username must be at least 4 characters long" }) || true
    if (username.length > 12) return res.status(400).json({ message: "Username cannot exceed 12 characters" }) || true

    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters long" }) || true
    if (password.length > 35) return res.status(400).json({ message: "Password cannot exceed 35 characters" }) || true

    if (password.includes(" ")) return res.status(400).json({ message: "Password cannot contain spaces" }) || true

    return false
}