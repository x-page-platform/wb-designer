import React from 'react';
import { Layout } from 'antd';
import PageNav from './components/PageNav';
import './design_layout.scss';

const { Header, Content, Sider } = Layout;

export default class DesignLayout extends React.Component {
  render() {
    return (
      <Layout>
        <Header>头部</Header>
        <Layout>
          <Sider className="page-nav-container"><PageNav/></Sider>
          <Content>{this.props.children}</Content>
          <Sider>侧边栏</Sider>
        </Layout>
      </Layout>
    );
  }
}
