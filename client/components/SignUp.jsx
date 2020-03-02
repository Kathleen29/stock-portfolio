import axios from 'axios';
import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null,
      errors: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.formValidation = this.formValidation.bind(this);
  }

  // on form change, update state with email and/or password entered
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSignUp(event) {
    // validate the input
    let error = {};
    if(this.formValidation()) {
      axios.post('/signup', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
        .then((res) => {
          // render new user's portfolio
          this.props.handleUserSignedIn(res.data.userId);
        })
        .catch((err) => {
          // if error, email already exists in db
          error.emailExists = 'Email already exists';
          this.setState({
            errors: error
          })
        });
      };
  };

  formValidation() {
    let isValid = true;
    let errors = {};
    // checks if name was entered and name contains only letters
    if(!this.state.name || !this.state.name.match(/^[a-zA-Z]+$/)) {
      errors.name = 'Please provide valid name';
      isValid = false;
    }

    // checks if email was entered
    if(!this.state.email || !(/\S+@\S+\.\S+/).test(this.state.email)) {
      errors.email = 'Please provide valid email';
      isValid = false;
    }
    // checks that password is at least 8 chars
    if(this.state.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
      isValid = false;
    }
    // any errors will render to the page
    this.setState({
      errors: errors
    });

    return isValid;
  };

  render() {
    return (
      <div className="sign-up-form">
        <h2>Register</h2>
        <form>
          <input type="text" id="name" placeholder="Name" onChange={this.handleChange}/>
          <div className="errors">{this.state.errors.name}</div>
          <input type="email" id="email" placeholder="Email" onChange={this.handleChange}/>
          <div className="errors">{this.state.errors.email}</div>
          <input type="password" id="password" placeholder="Password" onChange={this.handleChange}/>
          <div className="errors">{this.state.errors.password}</div>
          <button onClick={this.handleSignUp}>Sign Up</button>
          <div className="errors">{this.state.errors.emailExists}</div>
        </form>
      </div>
    );
  }
};

export default SignUp;