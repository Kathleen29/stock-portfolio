import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import Portfolio from './Portfolio.jsx';
import SignIn from './SignIn.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      loggedIn: false
    };
    this.handleUserSignedIn = this.handleUserSignedIn.bind(this);
  }

  // set user id and logged in to 'true' for authenticated users
  handleUserSignedIn(userId) {
    this.setState({
      user: userId,
      loggedIn: true
    })
  };

  getPortfolio() {
    axios.get('/portfolio/' + this.state.user);
  };

  render() {
    return (
      <div>
        { // if a user is signed in, render portfolio
          // else, render sign-in form
          (this.state.loggedIn)
          ? <Portfolio getPortfolio={this.getPortfolio}/>
          : <SignIn handleUserSignedIn={this.handleUserSignedIn}/>
        }
      </div>
    );
  }
};

export default App;