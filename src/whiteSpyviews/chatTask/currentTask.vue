<template>
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">

        <vx-card title="对话任务列表">
          <div slot="no-body" id="div-with-loading2" class="mt-4 ml-5">
           <vs-table
      :sst="true"
      :total="totalItems"
      pagination
      max-items="13"
      :data="taskList">
      <template slot="thead">
        <vs-th sort-key="email">
          任务ID
        </vs-th>
        <vs-th sort-key="username">
          人员ID
        </vs-th>
        <vs-th sort-key="website">
          所属群组ID
        </vs-th>
        <vs-th sort-key="id">
          创建时间
        </vs-th>

        <vs-th sort-key="id">
          平台
        </vs-th>
         <vs-th sort-key="id">
          状态
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].taskID}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].userId}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].source}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].startTime}}
          </vs-td>
           <vs-td :data="data[indextr].id">
             {{data[indextr].platform}}
          </vs-td>
          <vs-td :data="data[indextr].id">
<!--             {{data[indextr].accomplish}}-->
            <div v-if="data[indextr].accomplish=='1'"><span>已完成</span></div>
            <div v-else><span>未完成</span></div>


          </vs-td>
           <vs-td :data="data[indextr].id">
<!--             {{data[indextr].accomplish}}-->
            <div v-if="data[indextr].accomplish=='1'">
              <vs-button @click="showUserView(data[indextr].userId)" color="primary" type="border" size="small">查看画像</vs-button></div>
             <div v-else>
               <vs-button @click="activePromptFunc(data[indextr].userId)" color="primary" type="border" size="small">查看对话状态</vs-button></div>
          </vs-td>
        <vs-popup
      style="color:rgb(255,255,255)"
      background-color="rgba(255,255,255,.1)"
      :background-color-popup="colorx" :title="userId" :active.sync="activePrompt">
       <ChatLog :userId="userId"></ChatLog>
    </vs-popup>
<!--          <vs-td :data="data[indextr].id" @click="deleteGroup(data[indextr].id)">-->
<!--             <vs-icon icon="delete" size="10px" color="#f7f8fa"></vs-icon>-->
<!--          </vs-td>-->
        </vs-tr>
      </template>
    </vs-table>

    <pre ref="pre"></pre>
          </div>

        </vx-card>
      </div>
<!--        <vs-prompt-->
<!--      @cancel="val=''"-->
<!--      @accept="acceptAlert"-->
<!--      @close="close"-->
<!--      :active.sync="activePrompt">-->
<!--       <div class="con-exemple-prompt">-->
<!--          Enter the security code-->
<!--         <vs-input placeholder="Code" v-model="val"/>-->
<!--xxxx-->
<!--       </div>-->
<!--     </vs-prompt>-->
    </div>

</template>

<script>
    import {getChatTasks} from "../../api/chat";
    import ChatLog from "@/whiteSpyviews/chat/ChatLog"
    import VuePerfectScrollbar from "vue-perfect-scrollbar";
    export default {
        name: "currentTask",
    components: {
          VuePerfectScrollbar,
      ChatLog
    },
      data: () => ({
        userId:0,
         select1:2,
      options1:[
        {text:'IT',value:0},
        {text:'Blade Runner',value:2},
        {text:'Thor Ragnarok',value:3},
      ],
      activePrompt:false,
      val:'',
      valMultipe:{
        value1:'',
        value2:''
      },
         colorx:"#4a5153",
        selected: [],
      totalItems: 10,
        taskList:[]
      }),
      created() {
          this.$vs.loading({
        type:'sound',
        })
          getChatTasks("2").then(response=>{
            console.log("currentTaskList",response.data)
            this.taskList=response.data
            this.$vs.loading.close()
          this.$vs.notify({
          color:'success',
          title:`成功`,
          text:'数据获取成功'
          })
          }).catch(error=>{
            console.log("getCurrentTaskListError",error)
            this.$vs.loading.close()
          this.$vs.notify({
          color:'error',
          title:`错误`,
          text:'出错了请重试'
          })
          })
      },
      methods:{
          activePromptFunc(id){
            this.activePrompt=true
            this.userId=id
          },
          acceptAlert(color){
      this.$vs.notify({
        color:'success',
        title:'Accept Selected',
        text:'Lorem ipsum dolor sit amet, consectetur'
      })
    },
    close(){
      this.$vs.notify({
        color:'danger',
        title:'Closed',
        text:'You close a dialog!'
      })
    },
          showUserView(userId){
            this.$router.push({ name: 'userView', params: { userId: userId }})
          },
          fllush(){

          },
      },
    }
</script>

<style scoped>

</style>
