<!--  -->
<template>
  <div>
      <!-- 1. 为 ECharts 准备一个具备大小（宽高）的画布容器 DOM -->
      <div ref="main" style="width: 600px;height:400px;"></div>

      <h2>地图图表示例</h2>
      <map-demo></map-demo>
      <h2>纯粹的百度地图示例</h2>
      <bmap-demo></bmap-demo>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import MapDemo from './component/map-demo'
import BmapDemo from './component/bmap-demo'
export default {
  name: 'FansIndex',
  data () {
    return {
    }
  },

  components: {
      MapDemo,
      BmapDemo 
  },

  computed: {},

  mounted () {
      var myChart = echarts.init(this.$refs.main)
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            color:['#91cc75'],
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
                itemStyle: {
                    color: "rgba(221, 47, 47, 1)"
                }
            }]
        }
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option)
  },

  methods: {}
}

</script>
<style lang='scss' scoped>
</style>
