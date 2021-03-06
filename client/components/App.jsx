import axios from 'axios';
import React, { useState, useEffect, useReducer } from 'react';
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
      state = {
        ...state,
        portfolio: null
      };
      return state;
  };
};

const App = () => {
  const [userInfo, setState] = useReducer(reducer, {});

  useEffect(() => {
    if(userInfo.user) {
      handleUserSignedIn();
    };
  }, []);

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

  const viewTransactions = () => {
    // if transactions link is clicked from portfolio view, reset portfolio in state
    setState({ type: 'view transactions' });
  };

  return (
    <>
      {/* if a user is signed in, render portfolio, else, render sign-in form */}
      {userInfo.loggedIn
        // if a user's portfolio is saved to state, render the portfolio, else, render transaction list
        ? userInfo.portfolio !== null
          ? <><div className='container'>
            <Portfolio user={userInfo.user} portfolio={userInfo.portfolio} updatePortfolio={handleUserSignedIn} viewTransactions={viewTransactions}/>
            {/* render module to buy new stocks */}
            </div>
            <Buy userId={userInfo.user} bal={userInfo.balance} updatePortfolio={handleUserSignedIn}/>
          </>
          : <div className='container'>
            <Transactions userId={userInfo.user} handleUserSignedIn={handleUserSignedIn} viewTransactions={viewTransactions}/>
          </div>
        : <SignIn handleUserSignedIn={handleUserSignedIn}/>
      }
    </>
  );
};

export default App;
