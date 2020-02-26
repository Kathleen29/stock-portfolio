import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import Portfolio from './Portfolio.jsx';
import SignIn from './SignIn.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      portfolio: null
    };
    this.handleUserSignedIn = this.handleUserSignedIn.bind(this);
  }

  // set user id and logged in to 'true' for authenticated users
  handleUserSignedIn(userId) {
    this.getPortfolio(userId);
    this.setState({
      user: userId,
      loggedIn: true,
    })
  };

  getPortfolio(user) {
    axios.get('/portfolio/' + user)
      .then((res) => {
        this.setState({
          portfolio: res.data.portfolio
        })
      })
      .catch((err) => {
        console.log('Portfolio Empty');
      })
  };

  render() {
    return (
      <div>
        { // if a user is signed in, render portfolio
          // else, render sign-in form
          (this.state.loggedIn)
          ? <Portfolio portfolio={this.state.portfolio}/>
          : <SignIn handleUserSignedIn={this.handleUserSignedIn}/>
        }
      </div>
    );
  }
};

export default App;