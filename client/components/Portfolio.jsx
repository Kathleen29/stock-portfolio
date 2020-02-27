import axios from 'axios';
import Buy from './Buy.jsx';
import React from 'react';

const Portfolio = (props) => {
  return (
    <div>
      <h2>Portfolio $({})</h2>
      <table id='portfolio-table'>
      <tbody>
      {(props.portfolio)
        ? props.portfolio.map((stock) => {
          axios.get('/quote/' + stock.ticker)
            .then((res) => {
              return (
                <tr>
                  <td>{stock.ticker}</td>
                  <td>{stock.shares} Shares</td>
                  <td>${(res.data.quote * stock.shares).toFixed(2)}</td>
                </tr>
              )
            })
          })
        : <tr></tr>
      }
      </tbody>
      </table>
      <Buy userId={props.user} bal={props.bal} updatePortfolio={props.updatePortfolio}/>
    </div>
  )
};

export default Portfolio;
