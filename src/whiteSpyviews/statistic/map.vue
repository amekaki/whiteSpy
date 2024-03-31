<template>
    <div class="map-container" ref="myEchart" style="width:700px;height: 500px"></div>
</template>

<script>
  import * as echarts from 'echarts';
  import "echarts/map/js/china.js"; // 引入中国地图数据
  export default {
    name: "chinaMap",
    data() {
      return {
        mapData: {
          citys: [
            {
              name: '嘉兴',
              value: [120.755486, 30.746129, 4],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '营口',
              value: [122.235418, 40.667012, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '威海',
              value: [122.12042, 37.513068, 32],
              symbolSize: 14,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '杭州',
              value: [120.15507, 30.274085, 10],
              symbolSize: 14,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '抚顺',
              value: [123.957208, 41.880872, 3],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '海门',
              value: [121.181615, 31.871173, 2],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '珠海',
              value: [113.576726, 22.270715, 9],
              symbolSize: 14,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '河北',
              value: [114.475704, 38.584854, -19],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '深圳',
              value: [114.057868, 22.543099, 14],
              symbolSize: 14,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '黄浦',
              value: [121.484443, 31.231763, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '蓬莱',
              value: [120.758848, 37.810661, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '浙江',
              value: [120.152792, 30.267447, -2],
              symbolSize: 24,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '北京',
              value: [116.407526, 39.90403, -14],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '福建',
              value: [119.295144, 26.10078, -1],
              symbolSize: 14,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '惠州',
              value: [114.416196, 23.111847, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '青岛',
              value: [120.38264, 36.067082, 52],
              symbolSize: 3,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '菏泽',
              value: [115.480656, 35.23375, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '南通',
              value: [120.894291, 31.980172, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '南京',
              value: [118.796877, 32.060255, 17],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '温州',
              value: [120.699367, 27.994267, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '邢台',
              value: [114.504844, 37.070589, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '赣州',
              value: [114.93503, 25.831829, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '义乌',
              value: [120.075058, 29.306841, 3],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '南昌',
              value: [115.858198, 28.682892, 2],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '闵行',
              value: [121.381709, 31.112813, 18],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '长宁',
              value: [121.424624, 31.220367, 7],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '广州',
              value: [113.264435, 23.129163, 13],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '上海',
              value: [121.473701, 31.230416, 44],
              symbolSize: 3,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '苏州',
              value: [120.585316, 31.298886, 14],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '无锡',
              value: [120.31191, 31.49117, 14],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '常州',
              value: [119.973987, 31.810689, 4],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '广西',
              value: [108.327546, 22.815478, -1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '泉州',
              value: [118.675676, 24.874132, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '海阳',
              value: [121.158434, 36.776378, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '黄骅',
              value: [117.330048, 38.371383, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '湖北',
              value: [114.341862, 30.546498, -4],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '厦门',
              value: [118.089425, 24.479834, 3],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '江苏',
              value: [118.763232, 32.061707, -1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '常熟',
              value: [120.752481, 31.654376, 4],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '安徽',
              value: [117.284923, 31.861184, -1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '湖南',
              value: [112.98381, 28.112444, -1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '合肥',
              value: [117.227239, 31.820587, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '山东',
              value: [117.020359, 36.66853, -6],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#58B3CC',
                },
              },
            },
            {
              name: '宁波',
              value: [121.550357, 29.874557, 10],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
            {
              name: '滨海',
              value: [119.820831, 33.990334, 1],
              symbolSize: 2,
              itemStyle: {
                normal: {
                  color: '#F58158',
                },
              },
            },
          ]
        }
      }
    },
    mounted() {
      this.myEchart = echarts.init(this.$refs.myEchart);
      this.initMap()
    },
    methods: {
      // 地图
      initMap() {
        let option = {
          title: {
            show: false,
            text: '黑产人员分布图',
            left: 'center',
            textStyle: {
              color: '#fff',
            },
          },
          legend: {
            show: false,
          },
          geo: {
            nameMap: {
              China: '中国',
            },
            map: 'china',
            label: {
              emphasis: {
                show: false,
              },
            },
            zoom: 1.2,
            itemStyle: {
              normal: {
                borderColor: 'rgba(255,209,163, .5)', //区域边框颜色
                areaColor: 'rgba(73,86,166,.1)', //区域颜色
                borderWidth: 0.5, //区域边框宽度
                shadowBlur: 5,
                shadowColor: 'rgba(107,91,237,.7)',
              },
              emphasis: {
                borderColor: '#FFD1A3',
                areaColor: 'rgba(102,105,240,.3)',
                borderWidth: 1,
                shadowBlur: 5,
                shadowColor: 'rgba(135,138,255,.5)',
              },
            },
          },
          series: [
            {
              name: '地点',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: {
                brushType: 'stroke',
              },
              label: {
                emphasis: {
                  show: true,
                  position: 'right',
                  formatter: '{b}',
                },
              },
              symbolSize: 2,
              showEffectOn: 'render',
              itemStyle: {
                normal: {
                  color: '#46bee9',
                },
              },
              data: this.mapData.citys,
            },
            // {
            //   name: '线路',
            //   type: 'lines',
            //   coordinateSystem: 'geo',
            //   zlevel: 2,
            //   zoom: 1,
            //   large: true,
            //   effect: {
            //     show: true,
            //     constantSpeed: 30,
            //     symbol: 'pin',
            //     symbolSize: 3,
            //     trailLength: 0,
            //   },
            //   lineStyle: {
            //     normal: {
            //       color: new echarts.graphic.LinearGradient(
            //         0,
            //         0,
            //         0,
            //         1,
            //         [
            //           {
            //             offset: 0,
            //             color: '#58B3CC',
            //           },
            //           {
            //             offset: 1,
            //             color: '#F58158',
            //           },
            //         ],
            //         false
            //       ),
            //       width: 1,
            //       opacity: 0.2,
            //       curveness: 0.1,
            //     },
            //   },
            //   data: params.moveLines,
            // },
          ],
        };
        this.myEchart.setOption(option);
      }
    }
  }
</script>
