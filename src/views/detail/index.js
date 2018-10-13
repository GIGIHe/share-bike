import React, { Component } from 'react';
import {Link} from "react-router-dom"
import { Card, Avatar } from 'antd'
import axios from "../../Axios"
import './index.less';
const { Meta } = Card;
export default class OrderDetail extends Component {

    state={
        // addressMsg:[],//位置信息
        // areaMsg:[]//区域信息
        orderData:''//订单信息
    }
    //获取订单详情信息
    getData = () => {
        let { id } = this.props.match.params;//与动态路由参数名一致id
        axios.get('/order/detail', id).then(res => {
            // this.setState({
            //     addressMsg: res.result.position_list,
            //     areaMsg: res.result.area
            // });
            this.setState({
                orderData:res.result 
            })
              this.initMap(res.result);
          
            // console.log(this.state.addressMsg[0].lon)
        })
    }
    //加载完dom执行
    componentDidMount = () => {
        this.getData()
        console.log(this.props)
    }
    // 初始化地图
    // initMap = () => {
    //     const BMap = window.BMap;
    //     var map = new BMap.Map("container");          // 创建地图实例  
    //     var point = new BMap.Point(this.state.addressMsg[0].lon, this.state.addressMsg[0].lat);  // 创建点坐标 
    //     console.log("point:",point); 
    //     map.centerAndZoom(point, 15);                 // 初始化地图，设置中心点坐标和地图级别 
    //     this.addControl(); 
    // }
    initMap = result => {
      const BMap = window.BMap;
      this.map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(result.position_list[0].lon, result.position_list[0].lat);
      // 创建点坐标
      console.log("point:", point);
      this.map.centerAndZoom(point, 11); // 初始化地图，设置中心点坐标和地图级别
      this.addControl();
      this.drawPolyline(result.position_list);
      this.drawPolygon(result.area);
    //   this.map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
        // let mapStyle = { style: "midnight" }
        // this.map.setMapStyle(mapStyle);
    };
    //添加控件
    addControl = () => {
        const BMap = window.BMap;
        const map = this.map;
        var opts = { anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT, offset: new BMap.Size(150, 5) };     
        map.addControl(new BMap.NavigationControl(opts));  //平移缩放控件  
        map.addControl(new BMap.ScaleControl({ 
        anchor: window.BMAP_ANCHOR_BOTTOM_RIGHT,
        offset: new BMap.Size(80, 15)
        }));  //比例尺
    }

// 绘制折线路径
    drawPolyline = (position_list)=>{
        const BMap = window.BMap;
        const map = this.map;
        let startPoint = position_list[0];
        let endPoint = position_list[position_list.length-1];
        let startMapPoint = new BMap.Point(startPoint.lon, startPoint.lat);
        let endMapPoint = new BMap.Point(endPoint.lon, endPoint.lat);
        //新建一个Icon
        let startIcon = new BMap.Icon("/img/start_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42)
        });   
        
        let endIcon = new BMap.Icon("/img/end_point.png", new BMap.Size(36, 42),{
         imageSize:new BMap.Size(36,42)
        });
        let startMarker = new BMap.Marker(startMapPoint, { icon: startIcon });
        let endMarker = new BMap.Marker(endMapPoint, { icon: endIcon });
        map.addOverlay(startMarker);
        map.addOverlay(endMarker);
        // this.map.centerAndZoom(startMapPoint, 15);
        //创建折线路径
        let polyline = new BMap.Polyline(
            position_list.map(item => new BMap.Point(item.lon, item.lat)),
            { strokeColor: "#f00", strokeWeight: 6, strokeOpacity: 1 }
        );
        map.addOverlay(polyline);
    }

// 绘制服务区
    drawPolygon = (area) => {
        const BMap = window.BMap;
        const map = this.map;
        let polygon = new BMap.Polygon(area.map(item => new BMap.Point(item.lon, item.lat)),
            { strokeColor: "#f00", strokeWeight: 2, strokeOpacity: .5, fillColor: "#f234de", fillOpacity: .5 }
        );
        map.addOverlay(polygon);
    }


    
    render() {
        return <div>
            <header className="header-wrap">
              <h1 className="bgc">共享单车后台系统</h1>
              <div>
                <span>欢迎,Niko</span>
                <span>
                  <Link to="/login" className="wel">
                    退出
                  </Link>
                </span>
              </div>
            </header>
            <Card>
              <div id="container" />
            </Card>
            <Card title="基础信息" headStyle={{ fontSize: "20px", color: "#444", paddingLeft: "120px" }}>
              <div className="order-msg format">
                <ul>
                  <li>
                    <span>用车模式</span>
                    {this.state.orderData.mode}
                  </li>
                  <li>
                    <span>订单编号</span>
                    {this.state.orderData.order_sn}
                  </li>
                  <li>
                    <span>车辆编号</span>
                    {this.state.orderData.bike_sn}
                  </li>
                  <li>
                    <span>用户姓名</span>
                    {this.state.orderData.user_name}
                  </li>
                  <li>
                    <span>手机号码</span>
                    {this.state.orderData.mobile}
                  </li>
                </ul>
              </div>
            </Card>
            <Card title="行驶轨迹" headStyle={{ fontSize: "20px", color: "#444", paddingLeft: "120px" }}>
              <div className="trip-routes format">
                <ul>
                  <li>
                    <span>行程起点</span>
                    {this.state.orderData.start_location}
                  </li>
                  <li>
                    <span>行程终点</span>
                    {this.state.orderData.end_location}
                  </li>
                  <li>
                    <span>行驶里程</span>
                    {this.state.orderData.distance}
                  </li>
                </ul>
              </div>
            </Card>
            <Card style={{width:"200px",height:"200px"}}>
                <Meta
                    avatar={<Avatar src="http://img1.imgtn.bdimg.com/it/u=278270011,132145170&fm=26&gp=0.jpg" style={{ width: "60px", height: "60px", borderRadius: "50%" }} />}
                    title="阿狸"
                    description="我是阿狸"
                />
    
            </Card>
          </div>;
    }
}
