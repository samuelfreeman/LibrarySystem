interface Admin {
    id: string
    firstName: string
    lastName: string
    contact: string
    username: string
    password: string
    email: string
    otp: number
    createdAt: Date
    updatedAt : Date
}

type saveAdmin = Omit<Admin, 'id' | 'otp'>
type SavedAdmin = Omit<Admin, 'password'>

type loginAdmin = Pick<Admin, 'username' | 'password'>

type verifyAdmin = Pick<Admin, 'email' | 'otp'>

type updateAdmin = Partial<Admin>

type deleteAdmin = Pick<Admin, 'id'>

export { Admin, saveAdmin, loginAdmin, verifyAdmin, updateAdmin, SavedAdmin, deleteAdmin }