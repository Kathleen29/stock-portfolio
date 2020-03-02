import axios from 'axios';
import React from 'react';
import SignUp from './SignUp.jsx';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      view: 'sign-in',
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUpClick = this.handleSignUpClick.bind(this);
  }

  // on form change, update state with email and/or password entered
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSignIn() {
    // validate the input before creating user session
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        this.props.handleUserSignedIn(res.data.user_id);
      })
      .catch((err) => {
        this.setState ({
          error: 'Invalid email and/or password'
        });
      })
  };

  handleSignUpClick() {
    this.setState({
      view: 'sign-up'
    })
  }

  render() {
    return (
      <div>
      { (this.state.view === "sign-in")
        ? <div className="sign-in-form">
            <h2>Sign In</h2>
              <form>
                <input type="email" id="email" placeholder="Email" onChange={this.handleChange}/>
                <input type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
                <button onClick={this.handleSignIn}>Sign In</button>
            </form>
            <a href="#" id="signup" onClick={this.handleSignUpClick}>Sign Up</a>
            <div className="error">{this.state.error}</div>
        </div>
        : <SignUp handleUserSignedIn={this.props.handleUserSignedIn}/>
      }
      </div>
    );
  };
};

export default SignIn;