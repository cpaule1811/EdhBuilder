import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoogleSignin from './GoogleSignin';
import { requestUser, registerUser } from '../../actions';
import { Link } from 'react-router-dom'
import './Signin.css';

function Signin() {
	const [signInRegister, toggleSignInRegister] = useState(false)
	const { error, errorRegister } = useSelector(state => state.loginStatus)
	const [registerValues, setRegisterValues] = useState({ 
		username: "",
		email: "", 
		password: ""
	})
	const [signinValues, setSigninValues] = useState({ 
		email: "", 
		password: ""
	})
	const dispatch = useDispatch()

	const handleSignUp = (e) => { 
		e.preventDefault()
		dispatch(registerUser(registerValues));
	}

	const handleSignIn = (e) => { 
		e.preventDefault()
		dispatch(requestUser(signinValues));
	}

    return (
        <div className="background">
            <div className= {`container ${signInRegister && "right-panel-active"}`} id="container">
	<div className="form-container sign-up-container">
		<form>
			<h1>Create Account</h1>
			<div className="social-container">
				<GoogleSignin/>
			</div>
			<span>or use your email for registration</span>
			<input 
			    onChange={(e) => setRegisterValues({...registerValues, username: e.target.value})} 
				value={registerValues.name} 
				type="text" 
				placeholder="Name"
			/>
			<input
				onChange={(e) => setRegisterValues({...registerValues, email: e.target.value})} 
				value={registerValues.email}
				type="email"
				placeholder="Email" 
			/>
			<input 
				onChange={(e) => setRegisterValues({...registerValues, password: e.target.value})} 
				value={registerValues.password}
				type="password" 
				placeholder="Password" 
			/>
			<button onClick={(e) => handleSignUp(e)} className="signin-button">Sign Up</button>
			<button onClick= {(e) => {e.preventDefault(); toggleSignInRegister(false)}} className="mobile-signin-button" hidden>Sign In</button>
		</form>
	</div>
	<div className="form-container sign-in-container">
		<form action="#">
			<h1>Sign in</h1>
			<div className="social-container">
			      <GoogleSignin/>
			</div>
			<span>or use your account</span>
			<input 
			    onChange={(e) => setSigninValues({...signinValues, email: e.target.value})} 
				value={signinValues.email}
				type="email" 
				placeholder="Email" 
			/>
			<input 
			    onChange={(e) => setSigninValues({...signinValues, password: e.target.value})} 
				value={signinValues.password}
				type="password" 
				placeholder="Password" 
            />
			{error && errorRegister && <div className="invalid">{error}</div> }
			<Link to="/forgotyourpassword"><span className="forgot">Forgot your password?</span></Link>
			<button onClick={(e) => handleSignIn(e)} className="signin-button">Sign In</button>
			<button onClick= {(e) => {e.preventDefault(); toggleSignInRegister(true)}} className="mobile-signin-button" hidden>Sign Up</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-left">
				<h1>Welcome Back!</h1>
				<p>Please log in to get building</p>
				<button onClick= {() => toggleSignInRegister(false)} className="signin-button ghost" id="signIn">Sign In</button>
			</div>
			<div className="overlay-panel overlay-right">
				<h1>Hello, Friend!</h1>
				<p>Enter your personal details and start building</p>
				<button onClick= {() => toggleSignInRegister(true)} className="signin-button ghost" id="signUp">Sign Up</button>
			</div>
		</div>
	</div>
	<div className="form-container sign-up-container">
		<form>
			<h1>Create Account</h1>
			<div className="social-container">
				<GoogleSignin/>
			</div>
			<span>or use your email for registration</span>
			<input 
			    onChange={(e) => setRegisterValues({...registerValues, username: e.target.value})} 
				value={registerValues.name} 
				type="text" 
				placeholder="Name"
			/>
			<input
				onChange={(e) => setRegisterValues({...registerValues, email: e.target.value})} 
				value={registerValues.email}
				type="email"
				placeholder="Email" 
			/>
			<input 
				onChange={(e) => setRegisterValues({...registerValues, password: e.target.value})} 
				value={registerValues.password}
				type="password" 
				placeholder="Password" 
			/>
			{error && !errorRegister && <div className="invalid">{error}</div> }
			<button onClick={(e) => handleSignUp(e)} className="signin-button">Sign Up</button>
			<button onClick= {() => toggleSignInRegister(true)} className="mobile-signin-button" hidden>Sign In</button>
		</form>
	</div>
</div>

</div>
    );
}

export default Signin;