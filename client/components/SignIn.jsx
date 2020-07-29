import axios from 'axios';
import React, { useState } from 'react';
import SignUp from './SignUp.jsx';

const SignIn = ({ handleUserSignedIn }) => {
  const [loginInfo, setLogin] = useState({
    email: null,
    password: null,
    view: 'sign-in',
    error: null
  });

  const handleSignUpClick = () => {
    setLogin({
      ...loginInfo,
      view: 'sign-up'
    })
  };

  // on form change, update state with email and/or password entered
  const handleChange = (event) => {
    setLogin({
      ...loginInfo,
      [event.target.id]: event.target.value
    });
  };

  const handleSignIn = (event) => {
    event.preventDefault();

    axios.post('/login', {
      email: loginInfo.email,
      password: loginInfo.password
    })
      .then(res => {
        handleUserSignedIn(res.data.user_id);
     })
    // validate the input before creating user session
      .catch(err => {
        setLogin({
          ...loginInfo,
          error: err
      })
    })
  };

  return (
    <div>
    { (loginInfo.view === "sign-in")
      ? <div id="sign-in-form">
          <nav><a href="#" id='signup' onClick={handleSignUpClick}>Sign Up</a></nav>
          <h2>Sign In</h2>
            <form>
              <input type="email" id="email" placeholder="Email" onChange={handleChange}/>
              <br/>
              <input type="password" id="password" placeholder="Password" onChange={handleChange}/>
              <br/>
              <button onClick={handleSignIn}>Sign In</button>
          </form>
          <div className="error">{loginInfo.error}</div>
      </div>
      : <SignUp handleUserSignedIn={handleUserSignedIn}/>
    }
    </div>
  );
}

export default SignIn;
