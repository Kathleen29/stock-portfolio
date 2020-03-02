import axios from 'axios';
import Buy from './Buy.jsx';
import React from 'react';

const Portfolio = (props) => {
  let totalVal = 0;
  let stockRows = [];

  if(props.portfolio) {
    // iterate over each stock, creating a table row for each
    props.portfolio.map((stock) => {
      // add the total value of each stock to the total portfolio value
      totalVal += stock.currVal * stock.shares;
      stockRows.push(
        <tr key={stock.ticker}>
          <td>{stock.ticker.toUpperCase()}</td>
          <td>{stock.shares} Shares</td>
          <td>${(stock.currVal * stock.shares).toFixed(2)}</td>
        </tr>
      )
    })
  };

  return (
    <div>
      <h2>Portfolio (${totalVal.toFixed(2)})</h2>
      <table id='portfolio-table'>
        <tbody>
        {/* if user has stocks, render table rows for each, else render an empty row */}
        { (props.portfolio) ? stockRows.map(row => row) : <tr></tr> }
        </tbody>
      </table>
      {/* render module to buy new stocks */}
      <Buy userId={props.user} bal={props.bal} updatePortfolio={props.updatePortfolio}/>
    </div>
  )
};

export default Portfolio;
