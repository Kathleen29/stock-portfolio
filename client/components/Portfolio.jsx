import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Portfolio = ({ user, portfolio, updatePortfolio}) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     totalVal: 0
  //   };
  //   this.fetchInterval = 0;
  //   this.stockRows = [];
  // };{

  const [value, setValue] = useState(0);
  let stockRows = [];

  useEffect(() => {
    mapOverPortfolio();
    // API call to fetch portfolio and current stock prices every 10 seconds
    let fetchInterval = setInterval(() => updatePortfolio(user), 10000);
  }, []);

  // componentDidMount() {
  //   // API call to fetch portfolio and current stock prices every 10 seconds
  //   this.fetchInterval = setInterval(() => this.props.updatePortfolio(this.props.user), 10000);
  // };

  // componentWillUnmount() {
  //   // stop interval of API call to fetch portfolio and current stock prices
  //   clearInterval(this.fetchInterval);
  // };

  const mapOverPortfolio = () => {
    if(portfolio) {
      let totalValue = 0;
      // iterate over each stock, creating a table row for each
      portfolio.map((stock) => {
        let fontColor = 'grey';
        // add the total value of each stock to the total portfolio value
         totalValue += stock.currVal * stock.shares;

        if(stock.currVal < stock.openPrice) {
          fontColor = 'red';
        };

        if(stock.currVal > stock.openPrice) {
          fontColor = 'green';
        };

        stockRows.push(
          <tr key={stock.ticker} style={{color: fontColor}}>
            <td>{stock.ticker.toUpperCase()}</td>
            <td>{stock.shares} Shares</td>
            <td>${(stock.currVal * stock.shares).toFixed(2)}</td>
          </tr>
        );
      });

      setValue(totalValue);
    };
  };

  return (
    <div>
      <h2>Portfolio (${value.toFixed(2)})</h2>
      <table id='portfolio-table'>
        <tbody>
        {/* if user has stocks, render table rows for each, else render an empty row */}
        { (portfolio) ? stockRows.map(row => row) : <tr></tr> }
        </tbody>
      </table>
    </div>
  );
};

export default Portfolio;
