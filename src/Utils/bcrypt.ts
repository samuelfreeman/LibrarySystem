import   { hash, verify} from 'argon2'


export const hashPassword = async (password: string) => {
    const hashedPassword = await hash(password)
    return hashedPassword
}

export const verifyPassword = async (password: string, hashedPassword: string) => {
    const isValid = await verify(hashedPassword, password)
    return isValid
}