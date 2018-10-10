import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import './sider.less'
class Sider extends Component {
  render() {
    return (
      <div className="sider-wraper">
       <Menu
          mode="inline"
          theme="dark"
          className="menu"
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span><Link to="/admin/home" replace>首页</Link></span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="desktop" />
            <span>Option 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="inbox" />
            <span>Option 3</span>
          </Menu.Item>
             </Menu>
      </div>
    );
  }
}

export default Sider;