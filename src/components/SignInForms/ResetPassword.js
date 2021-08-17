import React, { useState, useEffect } from 'react';
import './Signin.css';
import { useParams, Redirect } from 'react-router-dom'


function ResetPassword() {

    const [passwordField, setPasswordField] = useState("")
    const [conPasswordField, setConPasswordField] = useState("")
    const [changed, setChanged] = useState("")
    const { resetid } = useParams()
    const [success, setSuccess] = useState(false)
    const [invalid, setInvalid] = useState(false)

    useEffect(() => {
        fetch('https://edh-builder-api-m7vk6.ondigitalocean.app/checkresetvalid')
    })

    const handleForm = (e) => {
        e.preventDefault()
        if (passwordField === conPasswordField) {
          fetch('https://edh-builder-api-m7vk6.ondigitalocean.app/resetpassword', {
              method: 'PUT',
              headers: {
                'content-Type': 'application/json',
                'Authorization': resetid
            },
              body: JSON.stringify({  
                    password: passwordField,
                })
          })
          .then(resp => resp.json())
          .then(confirmed => { 
              if (confirmed === 'success'){ 
                  setSuccess(true)
              }
              else { 
                  setChanged(confirmed)
              }
          })
        }
        else { 
            setChanged("Passwords don't match")
        }
    }

    return (
        <div className="background">
        {success || invalid && <Redirect to='/signin'/>}
        <div className=" username-container">
		<form>
            <h1>What is your account's email?</h1>
            <p style={{margin: '10px 0 10px 0'}}>Enter your email and we will send you a password reset link.</p>
            <input 
			    onChange={(e) => setPasswordField(e.target.value)} 
				value={passwordField} 
				type="password" 
				placeholder="New Password"
			/>
            <input 
			    onChange={(e) => setConPasswordField(e.target.value)} 
				value={conPasswordField} 
				type="password" 
				placeholder="Confirm password"
			/>
            <p style={{margin: '10px 0 10px 0', color: 'red'}}>{changed}</p>
            <button onClick={(e) => handleForm(e)} className="signin-button">SUBMIT</button>
		</form>
	</div>
	</div>
    );
}

export default ResetPassword;