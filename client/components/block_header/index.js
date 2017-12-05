import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

export default class BlockHeader extends React.Component {
  render() {
    return (
      <div className="block-header-wrap">
        <span className="block-title">{this.props.title}</span>
        {this.props.tools && (
          <ul className="block-tools">
            {
              this.props.tools.map((ele, i) => <li key={String(i)}>{ele}</li>)
            }
          </ul>
        )}
      </div>
    );
  }
}
