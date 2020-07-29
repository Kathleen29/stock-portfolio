import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Transactions = ({ userId }) => {
  const [transView, setTransView] = useState({
    view: false,
    transactions: null
  });

  // fetch data from the API after page renders
  useEffect(() => {
    // make a call to fetch transactions from the db
    axios.get('/transactions/' + userId)
      .then(res => {
        // set the view to 'true' to render transactions
        setTransView({
          view: true,
          transactions: res.data.transactions
        });
      })
      .catch(err => err);
  }, []);

  // for each transaction, render to the page
  return (
    <div>
      <h2>Transactions</h2>
      { (transView.view)
      ? <table>
        <tbody>
          { transView.transactions.map(trans => {
            return (
              <tr key={trans.id}>
                <td>BUY ({(trans.ticker).toUpperCase()})</td>
                <td>{trans.shares} Shares</td>
                <td>@ {trans.price}</td>
              </tr>
            )
          }) }
        </tbody>
        </table>
      : <div></div>
      }
    </div>
  )
};

export default Transactions;
