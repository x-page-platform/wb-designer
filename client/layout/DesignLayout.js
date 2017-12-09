import React from 'react';
import { Layout, Dropdown, Icon, Menu } from 'antd';
import PageNav from './components/PageNav';
import './design_layout.scss';

const { Header, Content, Sider } = Layout;
const MenuItem = Menu.Item;
export default class DesignLayout extends React.Component {
  render() {
    const { avatar_url, login } = window._global.userInfo;
    const menu = (
      <Menu>
        <MenuItem>个人主页</MenuItem>
        <MenuItem>
          <a href="/logout">退出登录</a>
        </MenuItem>
      </Menu>
    );
    return (
      <Layout>
        <Header>
          <div className="current-user">
            <Dropdown overlay={menu} trigger={['click']}>
              <a href="#">
                <img src={avatar_url} alt="" />
                <span>{login}</span>
                <Icon type="down" />
              </a>
            </Dropdown>
          </div>
        </Header>
        <Layout>
          <Sider className="page-nav-container">
            <PageNav />
          </Sider>
          <Content>{this.props.children}</Content>
          <Sider>侧边栏</Sider>
        </Layout>
      </Layout>
    );
  }
}
