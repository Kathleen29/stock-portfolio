import axios from 'axios';
import React from 'react';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      transactions: null
    };
    this.getTransactions = this.getTransactions.bind(this);
  };

  getTransactions(userId) {
    axios.get('/transactions/' + userId)
      .then((res) => {
        this.setState({
          view: true,
          transactions: res
        })
      })
  }

  render() {
    return (
      <div>
      { (this.state.view)
        ? <table>
          <tbody>
            { this.state.transactions.map(trans => {
              <tr>
              <td>BUY ({trans.ticker})</td>
              <td>{trans.shares} Shares</td>
              <td>@ {trans.total}</td>
              </tr>
            })}
          </tbody>
        </table>
        : <a href="#">Transactions</a>
      }
      </div>
    )
  }
};

export default Transactions;