import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export default function PasswordInput(props: TextFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    }
    return <TextField
        {...props}
        type={showPassword ? 'text' : 'password'}
        inputProps={{
            autoComplete: 'new-password'
        }}
        InputProps={{
            endAdornment:
                (<InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                    >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>)
        }} 
        />
}

