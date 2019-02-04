import React, { useState, useEffect } from "react";
import { validateEmail } from "./utils";
import usePasswordValidator from "./usePasswordValidator";

import "./App.css";

function Form() {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState({});
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [zipError, setZipError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [password, setPassword, setPasswordError] = usePasswordValidator();

  useEffect(() => {
    if (!email || validateEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Please enter a valid email.");
    }
  }, [email]);

  useEffect(() => {
    setZipError("");
    if (profile.zipCode) {
      if (profile.zipCode.match(/[a-zA-Z]/g)) {
        setZipError("Zip Code can only contain digits.");
      } else if (profile.zipCode.length > 0 && profile.zipCode.length !== 5) {
        setZipError("Zip Code must be 5 digits.");
      }
    }
  }, [profile.zipCode]);

  useEffect(() => {
    setNameError("");
    if (profile.name) {
      if (profile.name.match(/[^a-zA-Z]/g)) {
        setNameError("Name can only contain letters.");
      }
    }
  }, [profile.name]);

  useEffect(() => {
    if (!confirmPassword || !password) {
      setConfirmPasswordError("");
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError("The passwords must match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  }, [password, confirmPassword]);

  return (
    <div>
      <form>
        <h3>Please sign up</h3>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <div className="error">{emailError}</div>

        <input
          value={profile.name}
          onChange={e => setProfile({ ...profile, name: e.target.value })}
          type="text"
          placeholder="Name"
        />
        <div className="error">{nameError}</div>

        <input
          value={profile.zipCode}
          onChange={e => setProfile({ ...profile, zipCode: e.target.value })}
          type="text"
          placeholder="Zip Code"
        />
        <div className="error">{zipError}</div>

        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <div className="error">{setPasswordError}</div>

        <input
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
        />
        <div className="error">{confirmPasswordError}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
