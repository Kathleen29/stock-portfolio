import axios from 'axios';
import React from 'react';
import ReactDom from 'react-dom';
import Buy from './Buy.jsx';
import Portfolio from './Portfolio.jsx';
import SignIn from './SignIn.jsx';
import Transactions from './Transactions.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loggedIn: false,
      portfolio: null,
      balance: null,
    };

    this.handleUserSignedIn = this.handleUserSignedIn.bind(this);
    this.viewTransactions = this.viewTransactions.bind(this);
    this.handlePortfolioClick = this.handlePortfolioClick.bind(this);
  };

  // set user id, portfolio, and loggedIn to 'true' for authenticated users
  handleUserSignedIn(userId) {
    console.log('ran');
    // fetches portfolio from the server
    return axios.get('/portfolio/' + userId)
      .then((res) => {
        this.setState({
          user: userId,
          loggedIn: true,
          portfolio: res.data.portfolio,
          balance: res.data.balance
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // if portfolio link is clicked from transactions view, render the user's portfolio
  handlePortfolioClick() {
    this.handleUserSignedIn(this.state.user);
  };

  viewTransactions() {
    // if transactions link is clicked from portfolio view, reset portfolio in state
    this.setState({
      portfolio: null
    });
  };

  render() {
    return (
      <div>
        {/* if a user is signed in, render portfolio, else, render sign-in form */}
        { (this.state.loggedIn)
          // if a user's portfolio is saved to state, render the portfolio, else, render transaction list
          ? (this.state.portfolio)
            ? <div>
            <a href='#' id='transactions' onClick={this.viewTransactions}>Transactions</a>
            <Portfolio portfolio={this.state.portfolio} user={this.state.user}
          updatePortfolio={this.handleUserSignedIn}/>
            {/* render module to buy new stocks */}
            <Buy userId={this.state.user} bal={this.state.balance} updatePortfolio={this.handleUserSignedIn}/>
             </div>
            : <div>
              <a href='#' id='portfolio' onClick={this.handlePortfolioClick}>Portfolio</a>
              <Transactions userId={this.state.user}/>
            </div>
          : <SignIn handleUserSignedIn={this.handleUserSignedIn}/>
        }
      </div>
    );
  };
};

export default App;
