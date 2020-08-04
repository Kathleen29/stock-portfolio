import axios from 'axios';
import React, { useState } from 'react';

const Buy = ({ userId, bal, updatePortfolio }) => {
  const [buyInfo, setBuyInfo] = useState({});

  // on form change, update state with ticker symbol and quantity to buy
  const handleChange = (event) => {
    event.preventDefault();
    setBuyInfo({
      ...buyInfo,
      [event.target.id]: event.target.value,
      error: null
    });
  };

  const handleBuy = () => {
    // look up current price of stock
    axios.get('/quote/' + buyInfo.ticker)
      .then((res) => {
        axios.post('/buy', {
          ticker: buyInfo.ticker,
          shares: buyInfo.qty,
          quote: res.data.quote,
          user_id: userId
        })
        .then((res) => {
          // if not res.data, transaction was not completed
          if(!res.data) {
            setBuyInfo({
              ...buyInfo,
              error: 'Not enough funds'
            });
          } else {
            alert('Purchased ' + buyInfo.qty + ' share(s) of ' + buyInfo.ticker.toUpperCase() + '!');

            // clear form
            document.getElementById('buy-form').reset();

            // reset component state
            setBuyInfo({
              ticker: null,
              qty: null,
              error: null
            });

            // update portfolio view
            updatePortfolio(userId);
          };
        });
      })
      .catch((err) => {
        // if call to IEX API throws an error, ticker symbol is invalid
        setBuyInfo({
          ...buyInfo,
          error: 'Invalid ticker symbol'
        });
      });
  };

    return (
      <>
      <h2>Cash - ${bal}</h2>
      <form id="buy-form" className="container">
        <input type="text" id="ticker" placeholder="Ticker" onChange={handleChange} required/>
        <input type="number" id="qty" placeholder="Qty" onChange={handleChange} required/>
        <div className="error">{buyInfo.error}</div>
        <button onClick={handleBuy}>Buy</button>
      </form>
      </>
    );
};

export default Buy;
