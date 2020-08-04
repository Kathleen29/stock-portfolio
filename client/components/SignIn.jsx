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

  const handleSignInClick = () => {
    setLogin({
      ...loginInfo,
      view: 'sign-in'
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
    <div className='signin-container'>
    { (loginInfo.view === "sign-in")
      ? <>
       <nav>
         <a href="#" id='signin' className='active'>Sign In</a>
         <a href="#" id='signup' onClick={handleSignUpClick}>Sign Up</a>
       </nav>
        <div id="signin-form">
            <form>
              <input type="email" id="email" placeholder="Email" onChange={handleChange}/>
              <br/>
              <input type="password" id="password" placeholder="Password" onChange={handleChange}/>
              <br/>
              <button className='signin-button' onClick={handleSignIn}>Sign In</button>
          </form>
          <div className="error">{loginInfo.error}</div>
        </div>
      </>
      : <SignUp handleUserSignedIn={handleUserSignedIn} handleSignInClick={handleSignInClick}/>
    }
    </div>
  );
}

export default SignIn;
