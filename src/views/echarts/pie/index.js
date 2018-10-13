import React, { Component } from 'react'
import { Card } from "antd"; //引入ant design
import echarts from "echarts/lib/echarts"; //引入echarts主模块
import ReactEcharts from "echarts-for-react"; //引入react-for-echarts
import "echarts/lib/chart/pie"; //引入柱状图
import "echarts/lib/component/tooltip"; //引入提示框
import "echarts/lib/component/title"; //引入标题组件
import themeLight from "../themeLight";
export default class Pie extends Component {
    getOption1=()=>{
        return {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'right',
                data: ['Mon', 'Thr', 'Wed', 'Tue', 'Fri', 'Thu', 'Sun']
            },
            series: [{
                name: '骑行订单',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                        value: 3350,
                        name: 'Mon'
                    },
                    {
                        value: 3100,
                        name: 'Thr'
                    },
                    {
                        value: 2340,
                        name: 'Wed'
                    },
                    {
                        value: 1350,
                        name: 'Tue'
                    },
                    {
                        value: 1540,
                        name: 'Fri'
                    },
                    {
                        value: 3540,
                        name: 'Sun'
                    },
                    {
                        value: 2040,
                        name: 'Fri'
                    }

                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        }
    }
    getOption2=()=>{
        return{
              tooltip: {
                      trigger: 'item',
                      formatter: "{a} <br/>{b}: {c} ({d}%)"
                  },
                  legend: {
                      orient: 'vertical',
                      x: 'right',
                     data: ['Mon', 'Thr', 'Wed', 'Tue', 'Fri', 'Thu', 'Sun']
                  },
                  series: [{
                          name: '用户骑行订单',
                          type: 'pie',
                          radius: ['50%', '70%'],
                          avoidLabelOverlap: false,
                         
                          labelLine: {
                              normal: {
                                  show: true
                              }
                          },
                           data: [{
                                   value: 3350,
                                   name: 'Mon'
                               },
                               {
                                   value: 3100,
                                   name: 'Thr'
                               },
                               {
                                   value: 2340,
                                   name: 'Wed'
                               },
                               {
                                   value: 1350,
                                   name: 'Tue'
                               },
                               {
                                   value: 1540,
                                   name: 'Fri'
                               },
                               {
                                   value: 3540,
                                   name: 'Sun'
                               },
                               {
                                   value: 2040,
                                   name: 'Fri'
                               }

                           ]
                  }]
        }
    }
    componentWillMount = () => {
      echarts.registerTheme("your-theme", themeLight)
    }
    
  render() {
    return (
      <div>
            <Card title="饼状图一">
                <ReactEcharts option={this.getOption1()} theme={"your-theme"} />
            </Card>
            <Card title="饼状图二">
                <ReactEcharts option={this.getOption2()} theme={"your-theme"} />
            </Card>
      </div>
    )
  }
}


