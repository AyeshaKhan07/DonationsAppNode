export interface SignInProps {
    handleSignin: Function
    setAlreadyRegistered: Function
}

export interface ISignInPayload {
    email: string
    password: string
}

export interface ISignInApiResponse {
    status: number
    message: string
    accessToken: string
}