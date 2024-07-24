import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import ButtonWithLoader from '../../components/button-with-loader.component';
import PasswordInput from '../../components/password-textfield.component';
import { ISignUpPayload, SignUpProps } from '../../types/auth/sign-up.types';

export default function SignUpForm({ handleSignup, setAlreadyRegistered }: SignUpProps) {
    const [loading, setLoading] = useState(false)

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const signupPayload: ISignUpPayload = {
            firstName: String(data.get("firstName")),
            lastName: String(data.get("lastName")),
            email: String(data.get("email")),
            contact: String(data.get("contact")),
            password: String(data.get("password")),
        }
        setLoading(true)
        try {
            await handleSignup(signupPayload)
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
            Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={submitForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        id="contact"
                        label="Contact"
                        name="contact"
                        autoComplete="contact"
                    />
                </Grid>
                <Grid item xs={6}>
                    <PasswordInput
                        id="password"
                        name="password"
                        label="Password"
                        autoComplete="new-password"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <PasswordInput
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        autoComplete="new-password"
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
            </Grid>
            <ButtonWithLoader
                loading={loading}
                text='Sign Up'
                buttonProps={{
                    fullWidth: true,
                    variant: "contained",
                    sx: { mt: 3, mb: 2 },
                    type: "submit"
                }}
            />
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2" onClick={() => setAlreadyRegistered(true)}>
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </Box>
    </Box>
}
