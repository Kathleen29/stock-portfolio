import axios from 'axios';
import React from 'react';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      email: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  // on form change, update state with email and/or password entered
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSignUp(event) {
    // validate the input before creating user session
    axios.post('/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        this.props.handleUserSignedIn(res.data.user_id);
      })
      .catch((err) => {
        console.log('Email already exists');
      })
  };

  render() {
    return (
      <div className="sign-up-form">
        <h2>Register</h2>
        <form>
          <input type="text" id="name" placeholder="Name" onChange={this.handleChange} required></input>
          <input type="email" id="email" placeholder="Email" onChange={this.handleChange} required></input>
          <input type="password" id="password" placeholder="Password" onChange={this.handleChange} required></input>
          <button onClick={this.handleSignUp}>Sign Up</button>
        </form>
      </div>
    );
  }
};

export default SignUp;