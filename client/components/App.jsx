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
      portfolio: null,
      balance: null
    };
    this.handleUserSignedIn = this.handleUserSignedIn.bind(this);
  }

  // set user id and logged in to 'true' for authenticated users
  handleUserSignedIn(userId) {
    return axios.get('/portfolio/' + userId)
      .then((res) => {
        this.setState({
          user: userId,
          loggedIn: true,
          portfolio: res.data.portfolio,
          balance: res.data.balance
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
          ? <Portfolio portfolio={this.state.portfolio} bal={this.state.balance} user={this.state.user}
          updatePortfolio={this.handleUserSignedIn}/>
          : <SignIn handleUserSignedIn={this.handleUserSignedIn}/>
        }
      </div>
    );
  }
};

export default App;