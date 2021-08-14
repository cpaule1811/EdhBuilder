import React from 'react';
import { useDispatch } from 'react-redux';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login'
import { requestUserGoogle } from '../../actions';
import google from '../../icons/google.svg'

const clientId = process.env.REACT_APP_GOOGLE

function GoogleSignin() {

    const dispatch = useDispatch()

    const onSuccess= (res) => { 
        dispatch(requestUserGoogle(res));
        signOut()
    }

    const onLogoutSuccess= () => {
        console.log("logout successful")
    }

    const onFailure= (res) => { 
        console.log('login failed: res:', res)
    }

    const { signIn } = useGoogleLogin({
        onSuccess, 
        onFailure,
        clientId,
        isSignedIn: true, 
        accessType: 'offline'
    })

    const { signOut } = useGoogleLogout({
        clientId,
        onFailure,
        onLogoutSuccess
    })

    return (
        <span>
            <img onClick={signIn} src={google} alt="google sign in" width="28px"/>
        </span>
    );
}

export default GoogleSignin;