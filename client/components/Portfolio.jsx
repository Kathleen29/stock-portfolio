import React from 'react';
import Buy from './Buy.jsx';

const Portfolio = (props) => {
  return (
    <span>
      <h2>Portfolio $({})</h2>
      <table id='portfolio-table'></table>
      {props.portfolio.map((stock) =>
        <tr>
          <td>{stock.ticker}</td>
          <td>{stock.shares} Shares</td>
          <td>${stock.shares * currPrice}</td>
        </tr>
      )}
    })
      <Buy userId={props.user}/>
    </span>
  )
};

export default Portfolio;
