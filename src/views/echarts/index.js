import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';//引入echarts主模块
import "echarts/lib/chart/bar";//引入柱状图
import "echarts/lib/component/tooltip";//引入提示框
import "echarts/lib/component/title";//引入标题组件
export default class Echarts extends Component {
  render() {
    return (
      <div id="main">
        <h1>好多图</h1>
      </div>
    )
  }
}
