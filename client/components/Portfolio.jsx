import axios from 'axios';
import React from 'react';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalVal: 0
    };
    this.fetchInterval = 0;
    this.stockRows = [];
  };

  componentDidMount() {
    this.mapOverPortfolio();
    // API call to fetch portfolio and current stock prices every 10 seconds
    this.fetchInterval = setInterval(() => this.props.updatePortfolio(this.props.user), 10000);
  };

  componentWillUnmount() {
    // stop interval of API call to fetch portfolio and current stock prices
    clearInterval(this.fetchInterval);
  };

  mapOverPortfolio() {
    if(this.props.portfolio) {
      let totalValue = 0;
      // iterate over each stock, creating a table row for each
      this.props.portfolio.map((stock) => {
        let fontColor = 'grey';
        // add the total value of each stock to the total portfolio value
         totalValue += stock.currVal * stock.shares;

        if(stock.currVal < stock.openPrice) {
          fontColor = 'red';
        };

        if(stock.currVal > stock.openPrice) {
          fontColor = 'green';
        };

        this.stockRows.push(
          <tr key={stock.ticker} style={{color: fontColor}}>
            <td>{stock.ticker.toUpperCase()}</td>
            <td>{stock.shares} Shares</td>
            <td>${(stock.currVal * stock.shares).toFixed(2)}</td>
          </tr>
        );
      });

      this.setState({
        totalVal: totalValue
      });
    };
  };

  render() {
    return (
      <div>
        <h2>Portfolio (${this.state.totalVal.toFixed(2)})</h2>
        <table id='portfolio-table'>
          <tbody>
          {/* if user has stocks, render table rows for each, else render an empty row */}
          { (this.props.portfolio) ? this.stockRows.map(row => row) : <tr></tr> }
          </tbody>
        </table>
      </div>
    );
  };
};

export default Portfolio;
