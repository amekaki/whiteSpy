<template>
  <div>

    <el-row>
      <el-col :span="16">
            <el-row>
      <el-col :span="11"  >
        <vx-card class="mb-3">
                  <span class="flex items-center">
                <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-primary`"></span>
                <span class="font-semibold">已完成群组数</span>
            </span>
          <statistics-card-line icon="ShoppingBagIcon" :statistic="groupStatisticData.groupNumber"
                                :chartData="ordersRecevied.series" color='warning' type='area'></statistics-card-line>
        </vx-card>
      </el-col>
      <el-col :span="12" :offset="1">
        <vx-card class="ml-3 mb-3">
                  <span class="flex items-center">
                <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-primary`"></span>
                <span class="font-semibold">人员数</span>
            </span>
          <statistics-card-line icon="UsersIcon"  :statistic="groupStatisticData.personNumber"
                                :chartData="subscribersGained.series" type='area'></statistics-card-line>
        </vx-card>
      </el-col>
    </el-row>
  <el-row>
        <vx-card >
                  <span class="flex items-center">
                <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-primary`"></span>
                <span class="font-semibold">关联结果</span>
            </span>
          <!--      内容-->
          <GroupGraph></GroupGraph>
        </vx-card>
  </el-row>
      </el-col>
      <el-col :span="7" :offset="1">
        <el-row>
          <vx-card>
                  <span class="flex items-center">
                <span class="inline-block h-3 w-3 rounded-full mr-2" :class="`bg-primary`"></span>
                <span class="font-semibold">已发现团伙</span>
            </span>
            <!--      内容-->
<el-scrollbar style="height:800px">
 <vx-card class="mb-3" :title="getItemText(index+1)" v-for="(info,index) in groupListInfo" :key="index">
   <template slot="actions" >
     <span @click="showSpecific(index)" style="cursor:pointer">
         <vs-icon v-if="dropDown[index]" icon="expand_more " size="27px">
  </vs-icon>
  <vs-icon v-else icon="chevron_left" size="27px">
  </vs-icon>
</span>
   </template>
<div v-if="dropDown[index]" class="basicInfo">
  <div class="basicInfo-item">
    <vs-list>
      <vs-list-header title="人员信息" color="success"></vs-list-header>
  <vs-list-item  v-for="(person,indexPerson) in info.personList" :key="indexPerson" :title="person" subtitle="">
    <span @click="toPersonPage(person)">
        <vs-icon  icon="more_vert" size="27px" style="cursor:pointer">
  </vs-icon>
    </span>
  </vs-list-item>

      <vs-list-header title="黑卡信息" color="primary"> </vs-list-header>

        <vs-list-item v-for="(card,indexPerson) in info.info" :key="indexPerson" :title="indexPerson" :subtitle="getCardText(card)"></vs-list-item>
<!--  <vs-list-item v-for="(card,indexPerson) in info.aim" :key="indexPerson" :title="getCardText(card)" subtitle=""></vs-list-item>-->
<!--  <vs-list-item  :title="getPhoneText(info.phoneNumber)" subtitle=""></vs-list-item>-->
<!--  <vs-list-item  :title="getCardText(info.aim )" subtitle=""></vs-list-item>-->
</vs-list>
  </div>
</div>

 </vx-card>
</el-scrollbar>
          </vx-card>
        </el-row>
      </el-col>
    </el-row>
    {{change}}
  </div>
</template>

<script>
  import analyticsData from './analyticsData.js'
  import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
  import GroupGraph from "../graph/groupAnalyseGraph"
  import {getGroupInfo, getGroupStatistic,getGroupListInfo} from "../../api/show";

  export default {
    name: "groupAnalyse",
    components: {
      "GroupGraph": GroupGraph,
      StatisticsCardLine
    },
    data() {
      return {
        analyticsData: analyticsData,
        subscribersGained: {
          series: [{
            name: 'Subscribers',
            data: [28, 40, 36, 52, 38, 60, 55]
          }],
        },
        ordersRecevied: {
          series: [{
            name: 'Orders',
            data: [10, 15, 8, 15, 7, 12, 8]
          }],
        },
        groupStatisticData:{},
        groupInfo:{},
        groupListInfo:[],
        change:1,
        dropDown:[]
      }
    },
    computed:{

     groupStatisticDataText:function () {

        return {
          groupNumber: this.groupStatisticData.personNumber,
          personNumber: "人员数" + this.groupStatisticData.personNumber
        }
     }
    },
    created() {

      this.getStaticData()
    },
    methods:{
      getPhoneText(index,text){
        return index+text
      },
      getCardText(text){
        var str=''
        for(var i=0;i<text.length;i++){
          str=str+" "+text[i]
        }
        return str
      },
           toPersonPage(person){
             console.log("perosn")
        this.$router.push({ name: 'userView', params: { userId: person }})
      },
      showSpecific(index){
        this.dropDown[index]=! this.dropDown.[index]
        this.change=this.change+1
      },
      getItemText(number){
        return "团伙 "+number
      },
      getStaticData(){
        this.$vs.loading({
        type:'sound',
        })
        getGroupStatistic().then(response => {
          console.log("getGroupStatistic",response.data)
          this.groupStatisticData = response.data
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

        getGroupStatistic().then(response => {
          console.log("getGroupInfo",response.data)
          this.groupInfo = response.data
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
        getGroupListInfo().then(response => {
          console.log("getGroupListInfo",response.data)
          this.groupListInfo = response.data
          this.groupListInfo.forEach(info=>{
            this.dropDown.push(false)
          })
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
    }
  }
</script>

<style scoped>

</style>
