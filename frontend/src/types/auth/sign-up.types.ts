import { IUser } from "../user.types"

export interface SignUpProps {
    handleSignup: Function
    setAlreadyRegistered: Function
}

export interface ISignUpPayload {
    firstName: string
    lastName: string
    email: string
    contact: string
    password: string
}

export interface ISignUpApiResponse {
    status: number,
    message: string,
    user: IUser,
    accessToken: string
}