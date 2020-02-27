import axios from 'axios';
import React from 'react';

class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: null,
      qty: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  // on form change, update state with email and/or password entered
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  handleBuy() {
    // validate the input before creating user session
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
          console.log('Not enough funds');
        })
      })
      .catch((err) => {
        console.log('Invalid ticker symbol');
      })
  };

  render() {
    return (
      <div>
      <h2>Cash - ${this.props.bal}</h2>
      <form>
        <input type="text" id="ticker" placeholder="Ticker" onChange={this.handleChange} required></input>
        <input type="number" id="qty" placeholder="Qty" onChange={this.handleChange} required></input>
        <button onClick={this.handleBuy}>Buy</button>
      </form>
      </div>
    )
  }
};

export default Buy;