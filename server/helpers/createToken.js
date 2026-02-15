import jwt from 'jsonwebtoken'

const secret_key = process.env.SECRET_KEY

export default function createToken(createdUser) {
    const token = jwt.sign(
        {
            id: createdUser._id,
            username: createdUser.username,
            role: createdUser.role
        }, secret_key
    )

    return token
}