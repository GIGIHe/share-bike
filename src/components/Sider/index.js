import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Menu, Icon} from "antd";
import "./sider.less";
const SubMenu = Menu.SubMenu;
class Sider extends Component {
  render() {
    return <div className="sider-wraper">
        <Menu mode="inline" theme="dark" className="menu">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>
              <Link to="/admin/home" replace>首页</Link>
            </span>
          </Menu.Item>
        <SubMenu key="sub1" title={<span>
          <Icon type="desktop" />
          <span>订单管理</span>
        </span>}>
          <Menu.Item key="2">
            <span>
              <Link to="/admin/order" replace>
                用户订单信息
                </Link>
            </span>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span>
          <Icon type="inbox" />
          <span>数据分析</span>
        </span>}>
          <Menu.Item key="3">
            <span>
              <Link to="/admin/echarts/bar" replace>
                条形图
                </Link>
            </span>
          </Menu.Item>
            <Menu.Item key="4">
            <span>
              <Link to="/admin/echarts/pie" replace>
                饼状图
                </Link>
            </span>
          </Menu.Item>
        </SubMenu>
        </Menu>
      </div>;
  }
}

export default Sider;
