
export interface IUser extends Document {
    name: string
    avatar: string
    email: string
    password: string
    isAdmin: boolean
    gender: "Male" | "Female"
    matchPassword?: (enteredPassword: string) => Promise<boolean>
}