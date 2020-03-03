import axios from 'axios';
import React from 'react';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
      qty: null,
      error: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  };

  // on form change, update state with ticker symbol and quantity to buy
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleBuy() {
    // look up current price of stock
    axios.get('/quote/' + this.state.ticker)
      .then((res) => {
        axios.post('/buy', {
          ticker: this.state.ticker,
          shares: this.state.qty,
          quote: res.data.quote,
          user_id: this.props.userId
        })
        .then((res) => {
          // update portfolio view
          this.props.updatePortfolio(this.props.userId);
        })
        .catch((err) => {
              this.setState({
            error: 'Not enough funds'
          });
        });
      })
      .catch((err) => {
        this.setState({
          error: 'Invalid ticker symbol'
        });
      });
  };

  render() {
    return (
      <div>
      <h2>Cash - ${this.props.bal}</h2>
      <form>
        <input type="text" id="ticker" placeholder="Ticker" onChange={this.handleChange} required/>        <input type="number" id="qty" placeholder="Qty" onChange={this.handleChange} required/>
        <div className="error">{this.state.error}</div>
        <button onClick={this.handleBuy}>Buy</button>
      </form>
      </div>
    );
  };
};

export default Buy;
