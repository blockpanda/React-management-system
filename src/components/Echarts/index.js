//echarts组件的封装

import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

//echarts配置数据
const axisOption = {
    // 图例文字颜色
    textStyle: {
      color: "#333",
    },
    // 提示框
    tooltip: {
      trigger: "axis",
    },
    xAxis: {
      type: "category", // 类目轴
      data: [],
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
      axisLabel: {
        interval: 0,
        color: "#333",
      },
    },
    yAxis: [
      {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
      },
    ],
    color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
    series: [],
  }
  
  const normalOption = {
    tooltip: {
      trigger: "item",
    },
    color: [
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
    ],
    series: [],
  }
//useRef是一个钩子函数，1.用于访问dom元素2.存储任意课变值 
const Echarts = ({style, chartData, isAxisChart = true}) => {
    // 创建一个应用，然后挂载到echartREf上
    const echartRef = useRef()
    // 创建一个可变的引用对象，用于存储 ECharts 实例
    let echartObj = useRef(null)
    // 在chartData发生变化时，执行useEffect
    useEffect(() => {
        let options
        //echart的初始化，echartRef.current 是指向图表容器的 DOM 元素。
        if (!echartObj.current) {
            echartObj.current = echarts.init(echartRef.current)
        }
        
        //设置option
        if (isAxisChart) {
            axisOption.xAxis.data = chartData.xData
            axisOption.series = chartData.series
            options =axisOption
        } else {
            normalOption.series = chartData.series
            options = normalOption
        }
        echartObj.current.setOption(options)


    },[chartData])
    //传入空数组代表页面首次加载完后，判断....
    return (
        <div style={style} ref={echartRef}></div>
    )

}
export default Echarts