import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { IButtonWithLoaderProps } from "../types/components.types";
import { SxProps } from "@mui/material";


export default function ButtonWithLoader({ loading, text, loaderProps, buttonProps }: IButtonWithLoaderProps) {
    const defaultLoaderStyle: SxProps = {
        color: "white"
    }
    return <Button {...buttonProps} disabled={loading}>
        {
            loading ?
                <CircularProgress {...loaderProps} sx={{...defaultLoaderStyle, ...loaderProps?.sx}} /> :
                text
        }
    </Button>
}