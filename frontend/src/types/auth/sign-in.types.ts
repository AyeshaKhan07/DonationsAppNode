import { FormEventHandler } from "react";

export interface SignInProps {
    handleSubmit: FormEventHandler
    setAlreadyRegistered: Function
}