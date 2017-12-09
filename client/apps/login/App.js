import React from 'react';
import './style.scss';

export default class App extends React.Component {
  render() {
    return (
      <div className="login-container">
        <a href="/login/github">Login With Github</a>
      </div>
    );
  }
}
