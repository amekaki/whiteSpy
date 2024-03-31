<template>
  <el-row :gutter="1">
    <el-col :span="6">
      <el-row>
        <el-col :span="24">

          <dv-border-box-12 style="padding-top:15px;padding-left: 10px">
            <div style="min-height: 300px;">
              <vs-icon icon="trending_up" size="medium" color="#3699ff"></vs-icon>
              <span style="font-size: large;">群组活跃度</span>
              <div ref="echartZhe" style="width:350px;height: 224px;margin-top: 10px"></div>
            </div>
          </dv-border-box-12>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <dv-border-box-13>
            <div style="min-height: 400px;">
          <div class="d-flex pt-2 pl-2">
          <span style="color:#5cd9e8">
            <icon name="chart-line"></icon>
          </span>
            <div class="d-flex">
              <span class="fs-xl text mx-2">SIM卡归属地统计</span>
            </div>
            </div>
            <div class="d-flex jc-center body-box">
              <dv-scroll-board :config="configLocation" style="width:90%;height:400px;margin: 0 auto"/>
            </div>
          </div>
          </dv-border-box-13>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <chinaMap></chinaMap>
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="count">
            <el-row :gutter="20">
              <el-col :span="10">
                <img style="width: 112px"
                     src="../../assets/image/center-details-data4.png"
                     alt="群组数"
                />
              </el-col>
              <el-col :span="11" :offset="1">
                <div class='detail-item-text'>
                  <h3 class="countListTest1">接入群组</h3>
                  <span class="countListTest2">278</span>
                  <span class="countListTest2">个</span>
                </div>
              </el-col>
            </el-row>


          </div>
        </el-col>
        <el-col :span="8">
          <div class="count">
            <el-row :gutter="20">
              <el-col :span="10">
                <img style="width: 112px"
                     src="../../assets/image/center-details-data4.png"
                     alt="群组数"
                />
              </el-col>
              <el-col :span="11" :offset="1">
                <div class='detail-item-text'>
                  <h3 class="countListTest1">黑产类型</h3>
                  <span class="countListTest2">3</span>
                  <span class="countListTest2">个</span>
                </div>
              </el-col>
            </el-row>


          </div>
        </el-col>
        <el-col :span="8">
          <div class="count">
            <el-row :gutter="20">
              <el-col :span="10">
                <img style="width: 112px"
                     src="../../assets/image/center-details-data6.png"
                     alt="群组数"
                />
              </el-col>
              <el-col :span="11" offset="1">
                <div class='detail-item-text'>
                  <h3 class="countListTest1">发现黑产人员</h3>
                  <span class="countListTest2">1879</span>
                  <span class="countListTest2">个</span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="6">
      <el-row>
        <el-col :span="5">
          <div style="min-height: 300px;">
<!--            <dv-charts style="height: 300px;" :option="option1"/>-->
          </div>
        </el-col>
        <el-col :span="19"><img src="../../assets/image/earth-rotate.gif" alt="earth"
                               style="height: 200px;margin-top: 40px"></el-col>
      </el-row>
      <el-row>
        <span style="color:#5cd9e8">
          <icon name="align-left"></icon>
        </span>
        <span class="fs-xl text mx-2">黑产人员类型分析</span>
        <div>
          <dv-capsule-chart :config="config" style="width: 100%;height: 200px"/>
        </div>

      </el-row>
      <el-row>
        <dv-border-box-13>
          <div style="min-height: 200px;">
          <div class="d-flex pt-2 pl-2 pb-1">
          <span style="color:#5cd9e8">
            <icon name="chart-line"></icon>
          </span>
            <div class="d-flex">
              <span class="fs-xl text mx-2">SIM卡类型统计</span>
            </div>
            </div>
            <div class="d-flex jc-center body-box">
              <dv-scroll-board :config="config2" style="width:90%;height:190px;margin: 0 auto"/>
            </div>
          </div>
        </dv-border-box-13>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import chinaMap from '@/whiteSpyviews/statistic/map.vue'
  import * as echarts from 'echarts';

  export default {
    name: "all",
    components: {
      chinaMap,
    },
    data() {
      return {
        configLocation:{
          header: ["地区", "数量", "占比"],
          data: [
            ["广东", "129", "<span  class='colorGrass'>43%</span>"],
            ["福建", "125", "<span  class='colorRed'>40%</span>"],
            ["江苏", "119", "<span  class='colorGrass'>31%</span>"],
            ["湖南", "119", "<span  class='colorGrass'>31%</span>"],
            ["山东", "118", "<span  class='colorGrass'>29%</span>"],
            ["湖北", "116", "<span  class='colorGrass'>26%</span>"],
            ["河北", "116", "<span  class='colorGrass'>26%</span>"],
            ["河南", "112", "<span  class='colorGrass'>20%</span>"],
            ["北京", "61", "<span  class='colorGrass'>10%</span>"],
          ],
          rowNum: 9, //表格行数
          headerHeight: 35,
          headerBGC: "#0f1325", //表头
          oddRowBGC: "#0f1325", //奇数行
          evenRowBGC: "#171c33", //偶数行
          index: true,
          columnWidth: [50],
          align: ["center"]
        },
        config2: {
          header: ["类型", "数量", "占比"],
          data: [
            ["电销卡", "131", "<span  class='colorGrass'>48%</span>"],
            ["三网卡", "126", "<span  class='colorGrass'>37%</span>"],
            ["流量卡", "113", "<span  class='colorGrass'>23%</span>"],
            ["注册卡", "59", "<span  class='colorRed'>9%</span>"],

          ],
          rowNum: 4, //表格行数
          headerHeight: 35,
          headerBGC: "#0f1325", //表头
          oddRowBGC: "#0f1325", //奇数行
          evenRowBGC: "#171c33", //偶数行
          index: true,
          columnWidth: [50],
          align: ["center"]
        },
        config: {
          data: [
            {
              name: "SIM卡商",
              value: 165
            },
            {
              name: "接码",
              value: 126
            },
            {
              name: "号商",
              value: 156
            }
          ]
        },
        option1: {
          radar: {
            center: [
              "50%",
              "50%"
            ],
            radius: "70%",
            name: {
              formatter: function (name) {
                let arr;
                arr = ['{a|' + name + '}'];
                return arr.join('\n');
              },
              textStyle: {
                rich: {
                  //根据文字的组设置格式
                  a: {
                    color: '#BCDCFF',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'Source Han Sans CN',
                  },
                },
              },
            },
            indicator: [
              {name: '西峡', max: 300},
              {name: '周口', max: 300},
              {name: '南阳', max: 300},
              {name: '驻马店', max: 300},
              {name: '郑州', max: 300},
              {name: '洛阳', max: 300}
            ],
            polygon: true,
            axisLine: {
              show: false
            },
            splitLine: {
              show: false
            },
            splitArea: {
              show: true,
              color: [
                "rgba(84,136,255, 0.5)",
                "rgba(84,136,255, 0.4)",
                "rgba(84,136,255, 0.3)",
                "rgba(84,136,255, 0.2)",
                "rgba(84,136,255, 0.1)",
                "rgba(84,136,255, 0.05)"
              ],
              shadowColor: "rgba(0, 0, 0, .5)",
              shadowBlur: 5,
              shadowOffsetX: 10,
              shadowOffsetY: 10
            }
          },
          series: [
            {
              type: 'radar',
              data: [223, 189, 214, 265, 178, 155],
              lineStyle: {
                color: "rgba(160,159,246, 0.6)",
                width: 2
              },
              areaStyle: {
                color: "rgba(114,113,233,.4)",
                opacity: 0.8,
                shadowColor: "rgba(115,149,255,1)",
                shadowBlur: 10
              }
            }
          ]
        }
      }
    },
    mounted() {
      this.initEchart1()
    },
    methods: {
      initEchart1() {
        var chartDom = this.$refs.echartZhe
        var myChart = echarts.init(chartDom, 'dark');
        var option;

        option = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ["@shiminghao","@G_Voice","@ppayp","@vxfzzc"]
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['7-21', '7-22', '7-23', '7-24', '7-25', '7-26', '7-27']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '@shiminghao',
              type: 'line',
              data: [120, 132, 101, 134, 90, 80, 100]
            },
            {
              name: '@G_Voice',
              type: 'line',
              data: [220, 182, 191, 80, 100,99, 79]
            },
            {
              name: '@ppayp',
              type: 'line',
              data: [150, 232, 201, 150, 232, 201, 190]
            },
            {
              name: '@vxfzzc',
              type: 'line',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            // {
            //   name: '@sim114',
            //   type: 'line',
            //   stack: '总量',
            //   data: [820, 932, 901, 934, 1290, 1330, 1320]
            // }
          ]
        };

        option && myChart.setOption(option);

      }
    }
  }
</script>

<style scoped>
  .count {
    padding: 0 0.125rem;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #343f4b;
    background-color: rgba(19, 25, 47, 0.8);
  }

  .countListTest1 {
    margin-top: 30px;
    color: #bcdcff;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .countListTest2 {
    font-size: 20px;
    font-weight: bolder;
    background: linear-gradient(to bottom, #fff, #4db6e5);
    color: transparent;
    -webkit-background-clip: text;
    margin-top: 40px;
  }
</style>
