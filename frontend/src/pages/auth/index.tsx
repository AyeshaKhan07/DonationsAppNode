import * as React from 'react';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SignInForm from './sign-in-form';
import SignUpForm from './sign-up-form';
import Copyright from '../../components/copyright.component';
import authImage from '../../assets/katt-yukawa-K0E6E0a0R3A-unsplash.jpg'

export default function SignIn() {
    const [alreadyRegistered, setAlreadyRegistered] = React.useState(true);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${authImage})`,
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                {alreadyRegistered ? <SignInForm handleSubmit={handleSubmit} setAlreadyRegistered={setAlreadyRegistered} /> : <SignUpForm handleSubmit={handleSubmit} setAlreadyRegistered={setAlreadyRegistered} />}

                <Copyright sx={{ mt: 5 }} />
            </Grid>
        </Grid>
    );
}