import React from 'react';
import BlockHeader from '../../components/block_header';
import { Icon } from 'antd';

export default class PageNav extends React.Component {
  render() {
    return (
      <div>
        <BlockHeader title="Pages" tools={[<Icon type="plus" />]} />

      </div>
    );
  }
}
