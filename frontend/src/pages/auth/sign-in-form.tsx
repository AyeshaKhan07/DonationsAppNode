
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { ISignInPayload, SignInProps } from '../../types/auth/sign-in.types';
import ButtonWithLoader from '../../components/button-with-loader.component';

export default function SignInForm({ handleSignin, setAlreadyRegistered }: SignInProps) {
    const [loading, setLoading] = useState(false)

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signInPayload: ISignInPayload = {
            email: String(data.get("email")),
            password: String(data.get("password")),
        }
        setLoading(true)
        try {
            await handleSignin(signInPayload)
        } finally {
            setLoading(false)
        }
    };

    return <Box
        sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Sign in
        </Typography>
        <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <ButtonWithLoader
                loading={loading}
                text='Sign In'
                buttonProps={{
                    fullWidth: true,
                    variant: "contained",
                    sx: { mt: 3, mb: 2 },
                    type: "submit"
                }}
            />
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" onClick={() => setAlreadyRegistered(false)}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
}