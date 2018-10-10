import React, { Component } from 'react';
import Sider from '../../components/Sider/index';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/index';
import './admin.less'
import {Row, Col} from 'antd'
class Admin extends Component{
     render() {
    return(
    <div className="wrap">
            <Row>
            <Col span={4}>
            <Sider></Sider>
            </Col>
            <Col span={20}>
            <Header></Header>
            <div className="content">
             {this.props.children}
            </div>
            <Footer></Footer>
            </Col> 
            </Row>
    </div>
    
     
    );
  }
}
export default Admin




