import { ButtonProps, CircularProgressProps } from "@mui/material"

export interface IButtonWithLoaderProps {
    loading: boolean;
    text: React.ReactNode;
    loaderProps?: CircularProgressProps;
    buttonProps?: ButtonProps;
}