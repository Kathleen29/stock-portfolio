import React from 'react';
import Buy from './Buy.jsx';

const Portfolio = (props) => {
  return (
    <div>
      <h2>Portfolio $({})</h2>
      <table id='portfolio-table'></table>
      { (props.portfolio)
        ? props.portfolio.map((stock) =>
          <tr>
            <td>{stock.ticker}</td>
            <td>{stock.shares} Shares</td>
            <td>${stock.shares * currPrice}</td>
          </tr>)
        : <tr></tr>
      }
    })
      <Buy userId={props.user}/>
    </div>
  )
};

export default Portfolio;
