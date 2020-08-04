import axios from 'axios';
import React, { useState } from 'react';

const SignUp = ({ handleUserSignedIn, handleSignInClick }) => {
  const [signUpInfo, setSignUpInfo] = useState({
    name: null,
    email: null,
    password: null,
    passwordMatch: null,
    errors: {}
  });

  const formValidation = () => {
    var isValid = true;
    let errors = {};
    // checks if name was entered and name contains only letters
    if(!signUpInfo.name || !signUpInfo.name.match(/^[a-zA-Z]+$/)) {
      errors.name = 'Please provide valid name';
      isValid = false;
    };

    // checks if email in correct format was entered
    if(!signUpInfo.email || !(/\S+@\S+\.\S+/).test(signUpInfo.email)) {
      errors.email = 'Please provide valid email';
      isValid = false;
    };

    // checks that password is at least 8 chars long
    if(!signUpInfo.password || signUpInfo.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    };

    if(signUpInfo.password !== signUpInfo.passwordMatch) {
      errors.passwordMatch = 'Passwords must match';
      isValid = false;
    };

    // any errors will render to the page
    setSignUpInfo({
      ...signUpInfo,
      errors: errors
    });

    // if any of the above conditionals, isValid will be false
    return isValid;
  };

  // on form change, update state with name, email, and/or password entered
  const handleChange = () => {
    setSignUpInfo({
      ...signUpInfo,
      [event.target.id]: event.target.value
    });
  };

  const handleSignUp = (event) => {
    // store error for attempted sign-up with email already in the db
    let error = {};
    // validate the input
    if(formValidation()) {
      axios.post('/signup', {
        name: signUpInfo.name,
        email: signUpInfo.email,
        password: signUpInfo.password
      })
        .then((res) => {
          // render new user's portfolio with new user id
          handleUserSignedIn(res.data.userId);
        })
        .catch((err) => {
          // if error, email already exists in db
          error.emailExists = 'Email already exists';
          setSignUpInfo({
            ...signUpInfo,
            errors: error
          });
        });
      };
  };

  return (
    // renders sign-up form and any errors in the information entered
    <div className="sign-up-form">
      <nav>
        <a href="#" id='signin' onClick={handleSignInClick}>Sign In</a>
        <a href="#" id='signup' className='active'>Sign Up</a>
      </nav>
      <form id="signup-form">
        <input type="text" id="name" placeholder="Name" onChange={handleChange} required/>
        <div className="error">{signUpInfo.errors.name}</div>
        <input type="email" id="email" placeholder="Email" onChange={handleChange} required/>
        <div className="error">{signUpInfo.errors.email}</div>
        <input type="password" id="password" placeholder="Password" onChange={handleChange} required/>
        <div className="error">{signUpInfo.errors.password}</div>
        <input type="password" id="passwordMatch" placeholder="Confirm Password" onChange={handleChange} required/>
        <div className="error">{signUpInfo.errors.passwordMatch}</div>
        <button onClick={handleSignUp}>Sign Up</button>
        <div className="error">{signUpInfo.errors.emailExists}</div>
      </form>
    </div>
  );
};

export default SignUp;
