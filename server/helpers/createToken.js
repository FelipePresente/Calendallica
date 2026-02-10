import jwt from 'jsonwebtoken'

const secret_key = process.env.SECRET_KEY

export default function createToken(foundUser) {
    const token = jwt.sign(
        {
            id: foundUser._id,
            username: foundUser.username,
            role: foundUser.role
        }, secret_key
    )

    return token
}