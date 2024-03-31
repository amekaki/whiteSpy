<template lang="html">
  <div>
    <el-row>
             <vx-card title="基本信息" class="mt-0 mb-3">
          <div>
            <vs-avatar class="user-profile-img" :src="GroupInfo.photo" size="85px"/>
          </div>

          <!-- OTEHR DATA -->
          <div class="mt-5">
            <h6>来源</h6>
            <p>Telegram</p>
          </div>

          <div class="mt-5">
            <h6>群组昵称</h6>
            <p>{{GroupInfo.username}}</p>
          </div>
           <div class="mt-5">
            <h6>群组名称</h6>
            <p>{{GroupInfo.title}}</p>
          </div>
          <div class="mt-5">
            <h6>创建时间</h6>
            <p>{{GroupInfo.date}}</p>
          </div>

             </vx-card>
    </el-row>
    <el-row>
      <el-col :span="12">
        <vx-card title="成员活跃度分析">
          <div ref="echartActivity" style="width:500px;height: 400px;margin-top: 10px"></div>
        </vx-card>
      </el-col>
      <el-col :span="12">
        <vx-card title="成员类型分布">
          <div ref="memberAnalyseChartREF" style="width:500px;height: 400px;margin-top: 10px"></div>
        </vx-card>
      </el-col>
    </el-row>
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="">
<!--          @selected="handleSelected"-->
          <div slot="no-body" class="mt-4 pl-8 pr-8" >

            <vs-table
              :sst="true"
              v-model="selected"
              multiple
              @search="handleSearch"
              @change-page="handleChangePage"
              @sort="handleSort"
              :total="totalItems"
              pagination
              max-items="4"
              search
              :data="userData">
              <template slot="header">
                <h3>
                  成员列表
                </h3>
              </template>
              <template slot="thead">
                <vs-th sort-key="email">
                  Id
                </vs-th>
                <vs-th sort-key="email">
                  头像
                </vs-th>
                <vs-th sort-key="username">
                  姓名
                </vs-th>
                <vs-th sort-key="website">
                  用户名
                </vs-th>
                <vs-th sort-key="id">
                  关联黑产类型
                </vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].id">
                    {{data[indextr].id}}
                  </vs-td>
                   <vs-td :data="data[indextr].id">
                   <vs-avatar :src="data[indextr].photo"/>
                  </vs-td>
                  <vs-td :data="data[indextr].id">
                    {{data[indextr].first_name}} {{data[indextr].last_name}}
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    {{data[indextr].username}}
                  </vs-td>

                  <vs-td :data="data[indextr].id">
                    {{data[indextr].label}}
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>

            <pre ref="pre"></pre>
          </div>
          <el-button size="mini" type="primary" @click="startChatWithUserList()">开始对话</el-button>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
  import {getGroupInfoById, getUserByGroupId, getUserInfoById} from "../../api/group";
  import * as echarts from 'echarts';
  import {sendToOneUser, startChatList} from "../../api/chat";

  export default {
    data: () => ({
      GroupInfo:{},
      selected: [],
      totalItems: 10,
      userData: [],
      optionActivityChart:{
          backgroundColor: '',
          title: {
            // text: '堆叠区域图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#1e1e2d'
              }
            }
          },
          legend: {
            data: ['全部成员', '黑产相关成员']
          },
          // toolbox: {
          //   feature: {
          //     saveAsImage: {}
          //   }
          // },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['7-21', '7-22', '7-23', '7-24', '7-25', '7-26', '7-27']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '全部成员',
              type: 'line',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [27, 30, 17, 25, 23, 30,28]
            },
            {
              name: '黑产相关成员',
              type: 'line',
              areaStyle: {},
              emphasis: {
                focus: 'series'
              },
              data: [25, 28, 16, 20, 21, 29, 27]
            }
          ]
        },
    }),
    created() {
      this.getGroupInfo()
      this.getAllUser()
    },
    mounted() {
      this.initActivityChart()
      this.initMemberAnalyseChart()

    },
    methods: {
      getGroupInfo(){
        var groupId = this.$route.params.groupId
        getGroupInfoById(groupId).then(response=>{
          console.log("userInfo",response.data)
          this.GroupInfo=response.data
        }).catch(error=>{
          console.log("error",error)
        })
      },

      startChatWithUserList(){
        var userList=this.selected
        console.log("userList",userList)
        this.$vs.dialog({
        type:'confirm',
        color: 'success',
        title: `开始对话`,
        text: `开始选中用户的对话？`,
        accept:this.acceptChatList
      })
      },
      acceptChatList(){
        var userList=[]
        for(var i=0;i<this.selected.length;i++){
          userList.push(this.selected[i].id)
        }
        var groupId=this.$route.params.groupId
        startChatList(userList,groupId).then(response=>{
          console.log("chatsuccess",response)
          this.$vs.notify({
          title: `成功 `,
          text: `已成功开始与选中用户对话`
        })
        }).catch(error=>{
          console.log("error",error)
          this.$vs.notify({
          title: `失败 `,
          text: `任务出错`
        })
        })
      },
      initActivityChart() {
        var activitychartDom = this.$refs.echartActivity
        var activityChart = echarts.init(activitychartDom, 'dark');
        let option=this.optionActivityChart
         activityChart.setOption(option);
      },
      initMemberAnalyseChart() {
        var chartDom = this.$refs.memberAnalyseChartREF
        var myChart = echarts.init(chartDom, 'dark');
        var AnalyseChartoption;

        AnalyseChartoption = {
          backgroundColor: '',
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: '成员类型',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                {value: 130, name: '未知'},
                {value: 30, name: 'SIM卡'},
                {value: 17, name: '接码'},
                {value: 10, name: '账号'}
              ]
            }
          ]
        };

        AnalyseChartoption && myChart.setOption(AnalyseChartoption);
      },

      getAllUser() {
        this.$vs.loading({
        type:'sound',
        })
        var groupId = this.$route.params.groupId
        console.log(groupId, this.$route.params)
        getUserByGroupId(groupId).then(response => {
          console.log(response.data)
          this.userData = response.data
          this.$vs.loading.close()
          this.$vs.notify({
          color:'success',
          title:`成功`,
          text:'数据获取成功'
          })
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
          this.$vs.notify({
          color:'error',
          title:`错误`,
          text:'出错了请重试'
          })
        })
      },
      acceptAlertlabel(){
        console.log("select",this.selected)
        sendToOneUser(1663335744).then(response => {
          console.log(response.data)
          this.userData = response.data
          this.$vs.loading.close()
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })
        this.$vs.notify({
          title: `选中用户 ${this.selected.username}`,
          text: `开始对话`
        })
      },
      handleSelected(tr) {
        console.log("tr",tr)
          this.$vs.dialog({
        type:'confirm',
        color: 'success',
        title: `开始对话`,

        text: `开始与用户${tr.username}的对话？`,
        accept:this.acceptAlertlabel
      })
      },
      handleSearch(searching) {
        let _print = `The user searched for: ${searching}\n`
        this.$refs.pre.appendChild(document.createTextNode(_print))
      },
      handleChangePage(page) {
        let _print = `The user changed the page to: ${page}\n`
        this.$refs.pre.appendChild(document.createTextNode(_print))
      },
      handleSort(key, active) {
        let _print = `the user ordered: ${key} ${active}\n`
        this.$refs.pre.appendChild(document.createTextNode(_print))
      }
    }
  }
</script>
