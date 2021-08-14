import React, { useState } from 'react';
import '../SignInForms/Signin.css'

function Contact() {
    const [contactValues, setContactValues] = useState({ name: "", email: "", subject: "", message: "" })
    const [error, setError] = useState("")

    const onSend = (e) => { 
        e.preventDefault()
        fetch('https://edh-builder-api-m7vk6.ondigitalocean.app/send', { 
            method: "POST",
            headers: { 
                'content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: contactValues.name,
                email: contactValues.email, 
                subject: contactValues.subject,
                message: contactValues.message
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data !== "success") { 
                setError(data)
            }
        })
    } 

    return (
    <div className="background">
    <div className= "container" id="container">
	<div className="form-container sign-in-container no-animation">
	  <form action="#">
		<h1>Contact Us</h1>
			<input 
                onChange={(e) => setContactValues({...contactValues, name: e.target.value})}
				value={contactValues.name}
				type="text" 
				placeholder="Name" 
			/>
            <input 
                onChange={(e) => setContactValues({...contactValues, email: e.target.value})}
				value={contactValues.email}
				type="email" 
				placeholder="Email" 
			/>
			<input 
                onChange={(e) => setContactValues({...contactValues, subject: e.target.value})}
				value={contactValues.subject}
				type="text" 
				placeholder="subject" 
            />
            <textarea 
                onChange={(e) => setContactValues({...contactValues, message: e.target.value})}
                className="message-box"
                value={contactValues.message}
                placeholder="Message"
            />
            {error && <div className="invalid">{error}</div>}
			<button onClick={(e) => onSend(e)} className="signin-button">Send</button>
		</form>
	</div>
	<div className="overlay-container">
		<div className="overlay">
			<div className="overlay-panel overlay-right">
				<h1>We'd love to hear from you</h1>
				<p>Let us know if you encounter any issues or would just like to give feedback</p>
			</div>
		</div>
	</div>
</div>
</div>
    );
}

export default Contact;