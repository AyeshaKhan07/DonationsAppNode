import { FormEventHandler } from "react";

export interface SignInProps {
    handleSubmit: FormEventHandler
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