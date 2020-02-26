import axios from 'axios';
import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  // on form change, update state with email and/or password entered
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleSignIn(event) {
    // validate the input before creating user session
    axios.post('/login', {
      email: this.state.email,
      password: this.state.password
    })
      .then((res) => {
        this.props.handleUserSignedIn(res.data.user_id);
      })
      .catch((err) => {
        console.log('Invalid email and/or password');
      })
  };

  render() {
    return (
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <form>
          <input type="email" id="email" placeholder="Email" onChange={this.handleChange} required></input>
          <input type="password" id="password" placeholder='Password' onChange={this.handleChange} required></input>
          <button onClick={this.handleSignIn}>Sign In</button>
        </form>
      </div>
    );
  };
}

export default SignIn;