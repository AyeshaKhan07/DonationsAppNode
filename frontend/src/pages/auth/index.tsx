import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";

import SignInForm from './sign-in-form';
import SignUpForm from './sign-up-form';
import Copyright from '../../components/copyright.component';
import authImage from '../../assets/katt-yukawa-K0E6E0a0R3A-unsplash.jpg'
import { ISignInPayload } from '../../types/auth/sign-in.types';
import AuthApis from '../../apis/auth.apis';
import { WEB_URLS } from '../../constants';
import { ISignUpPayload } from '../../types/auth/sign-up.types';

export default function SignIn() {
    const navigate = useNavigate();
    const [alreadyRegistered, setAlreadyRegistered] = React.useState(true);

    const handleSignin = async (payload: ISignInPayload) => {
        await AuthApis.signIn(payload)
        navigate(WEB_URLS.HOME)
    };

    const handleSignup = async (payload: ISignUpPayload) => {
        await AuthApis.signUp(payload)
        navigate(WEB_URLS.HOME)
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
                {alreadyRegistered ? <SignInForm handleSignin={handleSignin} setAlreadyRegistered={setAlreadyRegistered} /> : <SignUpForm handleSignup={handleSignup} setAlreadyRegistered={setAlreadyRegistered} />}

                <Copyright sx={{ mt: 5 }} />
            </Grid>
        </Grid>
    );
}