import React, { Component } from "react";
import { Card } from "antd"; //引入ant design
import echarts from "echarts/lib/echarts"; //引入echarts主模块
import ReactEcharts from "echarts-for-react"; //引入react-for-echarts
import "echarts/lib/chart/bar"; //引入柱状图
import "echarts/lib/component/tooltip"; //引入提示框
import "echarts/lib/component/title"; //引入标题组件
import echartTheme from "../echartTheme";
export default class Echarts extends Component {
  //
  getOption1 = () => {
    return {
      color: ["#3398DB"],
      title:{text:"OFO周订单"},
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        // axisTick: { alignWithLabel: true }
      },
      yAxis: {
        type: "value"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { // 坐标轴指示器，坐标轴触发有效果
          type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      //shangehuakanxiaoguocaide
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      series: [{
        data: [1200, 2000, 1500, 8000, 7000, 11000, 13000],
        name: "日订单量",
        type: "bar",
        barWidth: "60%"
      }]
    };
  };
  getOption2 = () => {
    return {
      title: { text: "用户骑行订单" },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisTick: { alignWithLabel: true }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line'
        }
      },
      //zuishangfangtuli
      legend: {
        data: ['OFO', '小蓝车', '摩拜']
      },
      yAxis: {
        type: "value"
      },
      //shangehuakanxiaoguocaide
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      toolbox: {
        show: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      series: [
        {
        data: [1200, 2000, 1500, 8000, 7000, 11000, 13000],
        type: "bar",
        name:"OFO"
      },
        {
          data: [1200, 2000, 1500, 8000, 7000, 11000, 13000],
          type: "bar",
          name:"小蓝车"
        },
         {
          data: [1200, 2000, 1500, 8000, 7000, 11000, 13000],
          type: "bar",
           name: "摩拜"
        }
    ]
    };
  };
  componentWillMount = () => {
    echarts.registerTheme("my_theme", echartTheme);
  };

  render() {
    return (
      <div id="main">
        {/* 使用react-for-echarts option接受一个函数，ready*/}
        <Card title="柱形图一">
          <ReactEcharts option={this.getOption1()} theme={"my_theme"} />
        </Card>
          <Card title="柱形图二">
          <ReactEcharts option={this.getOption2()} theme={"my_theme"} />
        </Card>
        
      </div>
    );
  }
}
