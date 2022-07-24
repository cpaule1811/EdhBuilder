import React, { useState } from "react";
import "./Signin.css";

function ForgotPassword() {
  const [emailField, setEmailField] = useState("");
  const [confirmed, setConfirmed] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}forgotpassword`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        email: emailField,
      }),
    })
      .then((resp) => resp.json())
      .then((confirmed) => {
        setConfirmed(confirmed);
      });
  };

  return (
    <div className="background">
      <div className=" username-container">
        <form>
          <h1>What is your account's email?</h1>
          <p style={{ margin: "10px 0 10px 0" }}>
            Enter your email and we will send you a password reset link.
          </p>
          <input
            onChange={(e) => setEmailField(e.target.value)}
            value={emailField}
            type="email"
            placeholder="Email"
          />
          <p
            style={{
              margin: "10px 0 10px 0",
              color: confirmed.startsWith("Please check") ? "green" : "red",
            }}
          >
            {confirmed}
          </p>
          <input
            type="submit"
            onClick={(e) => handleForm(e)}
            className="signin-button"
            value="submit"
          />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
