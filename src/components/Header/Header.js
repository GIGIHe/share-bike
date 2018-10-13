import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {  Breadcrumb,Icon} from "antd";
import './Header.less'
import {formatDate} from '../../utils/index'
import axios from '../../Axios'
class Header extends Component {
    state = {
        time: '',
        weather: '',
        city: ''
    }
    getTime = () => {
        setInterval(() => {
            let unixDate = new Date().getTime();
            let timeStr = formatDate(unixDate);
            this.setState({
                time: timeStr
            })
        }, 1000)
    }

    getWeather = () => {
        axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res => {
            let newWeather = res.data.forecast[0]
            this.setState({
                weather: `${newWeather.low}~${newWeather.high} \t ${newWeather.fx} ${newWeather.fl}`,
                city: `${res.cityInfo.city}`
            })
        })
    }
    componentWillMount() {
        this.getTime();
        this.getWeather();
        console.log(this.props)
    }

    handleJump = () => {
        console.log(1)
        window.location.href = `/#/`
    }
    render() {
        return (
            <div className="header-wraper">
                <div className="top-wrap">
                <div className="top">
                <div className="welcome">欢迎,<span className="name">Niko</span></div>
                <div className="logout" onClick={this.handleJump}>退出</div>
                </div>
                </div>
                <div className="bottom">
                   <Breadcrumb  className="breadcrumb">
                        < Breadcrumb.Item className = "item" key="home">首页</Breadcrumb.Item>
                   </Breadcrumb>
                    <div className="t-wea">
                    <span className="time">{this.state.time}</span>
                    <span className="wea">{this.state.weather}</span>
                    <span className="city"><Icon type="loading" theme="outlined" />{this.state.city}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;