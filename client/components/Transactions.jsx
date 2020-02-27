import axios from 'axios';
import React from 'react';

const Transactions = (props) => {
  getTransactions(user) {
    return axios.get('/transactions/' + user)
      .then((res) => {
        return res.data.transactions;
      })
  }

  render() {
    return (
      <table>
        <tbody>
          { getTransactions(props.userId).map(trans => {
            <tr>BUY ({trans.ticker})</tr>
            <tr>{trans.shares} Shares</tr>
            <tr>@ {trans.total}</tr>
          })}
        </tbody>
      </table>
    )
  }
};

export default Transactions;