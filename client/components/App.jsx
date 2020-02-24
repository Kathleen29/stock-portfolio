import React from 'react';
import ReactDom from 'react-dom';
import SignIn from './SignIn.jsx'

class App extends React.Component {
  render() {
    return (
      <div>
        {/* Renders Sign In form on page load */}
        <SignIn />
      </div>
    )
  }
}

export default App;