import axios from 'axios';
import React from 'react';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: false,
      transactions: null
    };
  };

  componentDidMount() {
    // make a call to fetch transactions from the db
    axios.get('/transactions/' + this.props.userId)
      .then((res) => {
        // set the view to 'true' to render transactions
        this.setState({
          view: true,
          transactions: res.data.transactions
        });
      });
  };

  render() {
    // for each transaction, render to the page
    return (
      <div>
        <h2>Transactions</h2>
        { (this.state.view)
        ? <table>
          <tbody>
            { this.state.transactions.map(trans => {
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
  }
};

export default Transactions;