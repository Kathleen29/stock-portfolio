import React from 'react';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    // validate the input before creating user session
    this.setState({
      email: event.target.value,
    });
  }

  render() {
    return (
      <div className="sign-in-form">
        <h2>Sign In</h2>
        <input type="email" id="email" placeholder="Email"></input>
        <input type="text" id="password" placeholder='Password'></input>
        <button onClick={this.handleSubmit}>Sign In</button>
      </div>
    );
  }
}

export default SignIn;