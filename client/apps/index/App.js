import React from 'react';
import DesignLayout from '../../layout/DesignLayout';
import './style.scss';

export default class App extends React.Component {
  render() {
    return (
      <DesignLayout className="app-container">
        this is the content by index app
      </DesignLayout>
    );
  }
}
