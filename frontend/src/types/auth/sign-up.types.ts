import { FormEventHandler } from "react";

export interface SignUpProps {
    handleSubmit: FormEventHandler
    setAlreadyRegistered: Function
}