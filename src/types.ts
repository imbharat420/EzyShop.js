
export interface IUser extends Document {
    username: string
    email: string
    avatar: string
    password: string
    isAdmin: boolean
    gender: "Male" | "Female"
    checkPassword(password: string): Promise<boolean>
}