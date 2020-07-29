import axios from 'axios';
import React, { useState, useReducer, useEffect } from 'react';
import Buy from './Buy.jsx';
import Portfolio from './Portfolio.jsx';
import SignIn from './SignIn.jsx';
import Transactions from './Transactions.jsx';

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch portfolio':
      state = action.data;
      return state;
    case 'view transactions':
      state.portfolio = null;
      return state;
  };
};

const App = () => {
  let state = {
    user: null,
    loggedIn: false,
    portfolio: null,
    balance: null,
  };

  const [userInfo, setState] = useReducer(reducer, state);

  const handleUserSignedIn = ((userId) => {
    // fetches portfolio from the server
    let id = userInfo.user || userId;
    return axios.get('/portfolio/' + id)
      .then((res) => {
        setState({ type: 'fetch portfolio', data: {
          user: id,
          loggedIn: true,
          portfolio: res.data.portfolio,
          balance: res.data.balance
        }});
      })
      .catch(err => err);
  });

  // if portfolio link is clicked from transactions view, render the user's portfolio
  // handlePortfolioClick() {
  //   this.handleUserSignedIn(this.state.user);
  // };

  const viewTransactions = () => {
    // if transactions link is clicked from portfolio view, reset portfolio in state
    setState({ type: 'view transactions', data: {
      portfolio: null
    }});
  };

  console.log(userInfo.portfolio !== null);

  return (
    <div>
      {/* if a user is signed in, render portfolio, else, render sign-in form */}
      { userInfo.loggedIn
        // if a user's portfolio is saved to state, render the portfolio, else, render transaction list
        ? (userInfo.portfolio !== null
          ? <div>
            <a href='#' id='transactions' onClick={viewTransactions}>Transactions</a>
            <Portfolio portfolio={userInfo.portfolio} user={userInfo.user}
        updatePortfolio={handleUserSignedIn}/>
            {/* render module to buy new stocks */}
            <Buy userId={userInfo.user} bal={userInfo.balance} updatePortfolio={handleUserSignedIn}/>
          </div>
          : <div>
            <a href='#' id='portfolio' onClick={handleUserSignedIn}>Portfolio</a>
            <Transactions userId={userInfo.user}/>
          </div>)
        : <SignIn handleUserSignedIn={handleUserSignedIn}/>
      }
    </div>
  );
};

export default App;
