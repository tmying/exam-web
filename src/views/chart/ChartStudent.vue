<template>
  <div class="chart-student">
    <!--设置一个画布标签-->
    <div ref="mychart" style="width:100%;height:400px"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { stuList } from "@/apis/student";
import moment from "moment";
export default {
  data() {
    return {
      dataX: [], //x轴数据
      dataY: [] //y轴数据
    };
  },
  // 异步处理，等待数据获取然后渲染
  async mounted() {
    await stuList().then(data => {
      var arr=[],obj={};
      // 录入时间格式化
      data.forEach(v => {
         v.inputtime = moment(v.inputtime).format("YYYY-MM-DD");
         arr.push(v.inputtime)
      })
      // 构造日期对象
      for (let i = 0; i < arr.length; i++) {
        var key=arr[i];
        if(obj[key]){
          obj[key]++;
        }else{
          obj[key]=1;
        }
      }
      // 得到类目轴(x)和数据轴(y)数据
      for (const key in obj) {
        this.dataX.push(key);
        this.dataY.push(obj[key])
      }
    });
    // 2.初始化echarts实例
    var mychart = echarts.init(this.$refs.mychart);
    // 3.绘制图表
    mychart.setOption({
      // 图表标题
      title: {
        text: "学生周注册统计图",
        textStyle: {
          fontWeight:'normal',
          colour:'#303133'
        },
        x: "center"
      },
      tooltip: {},
      // // 图例组件
      legend: {
        left: "left",
        orient: "vertical",
        data: ["人数"]
      },
      xAxis: {
        type: "category",
        data: this.dataX
      },
      yAxis: {
        type: "value"
      },
      // 系列列表
      series: [
        {
          name: "人数",
          type: "line",
          data: this.dataY
        }
      ]
    });
  }
};
</script>

<style lang="less">
.chart-student {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background: #fff;
  width: 70%;
  height: 400px;
  margin: 30px auto;
  padding: 20px 0 0 30px;
}
</style>