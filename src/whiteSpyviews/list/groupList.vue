<template lang="html">
  <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">


        <vx-card title="接入群组管理">
          <div slot="no-body" class="mt-4 ml-5">
<!--            <el-upload-->
<!--  class="upload-demo "-->
<!--  action=""-->
<!--  :http-request="addFile"-->
<!--  :show-file-list='false' >-->
<!--  <el-button size="mini" type="primary">导入</el-button>-->
              <el-button size="mini" type="primary" @click="deleteGroupS()">删除</el-button>
<!--</el-upload>-->
           <vs-table
      :sst="true"
      multiple
      v-model="selected"
      :total="totalItems"
      pagination
      max-items="7"
      :data="groupList">
      <template slot="thead">
        <vs-th sort-key="email">
          ID
        </vs-th>
        <vs-th sort-key="website">
          群头像
        </vs-th>
        <vs-th sort-key="username">
          群名称
        </vs-th>
        <vs-th sort-key="website">
          昵称
        </vs-th>
        <vs-th sort-key="id">
          创建时间
        </vs-th>
        <vs-th sort-key="id">
          平台
        </vs-th>
<!--        <vs-th sort-key="id">-->
<!--          操作-->
<!--        </vs-th>-->
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].id}}
          </vs-td>
        <vs-td :data="data[indextr].id">
                   <vs-avatar :src="data[indextr].photo"/>
                  </vs-td>
          <vs-td :data="data[indextr].id">
            {{data[indextr].title}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].username}}
          </vs-td>

          <vs-td :data="data[indextr].id">
            {{data[indextr].date}}
          </vs-td>
           <vs-td :data="data[indextr].id">
            Telegram
          </vs-td>
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
    </div>
</template>

<script>
  import {deleteGroupsById, getAllGroup} from "../../api/group";

export default {
  data:()=>({
    selected:[],
    totalItems:10,
    groupList:[]
  }),
  beforeCreate() {
    this.$vs.loading({
        type:'sound',
        })
    getAllGroup().then(response => {
          console.log('resopnse e', response)
          this.groupList = response.data
      this.$vs.loading.close()
          this.$vs.notify({
          color:'success',
          title:`成功`,
          text:'数据获取成功'
          })
        })
      .catch(error => {
          console.log(error)
      this.$vs.loading.close()
          this.$vs.notify({
          color:'error',
          title:`错误`,
          text:'出错了请重试'
          })
        })
  },
  methods:{
    deleteGroup(id){
      alert(id)
    },
    deleteGroupS(){

        this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: `确认删除`,
        text: '是否确认删除所选所有群组？',
        accept:this.acceptAlert
      })

    },
    acceptAlert(){
      let ids=[]
        let seletedGroup=this.selected
      console.log(seletedGroup)
        for(var i=0;i<seletedGroup.length;i++){
          let group=seletedGroup[i]
          console.log(group,group.id)
          ids.push(group["id"])
        }
      deleteGroupsById(ids).then(response => {
          console.log('resopnsee', response)
           this.$vs.dialog({
        color:'success',
        title: `成功`,
        text: '群组删除成功'
      })
          this.getAllGroups()
        }).catch(error => {
          console.log(error)
        })
    },
    addFile(file){
      let reader = new FileReader()
      reader.readAsText(file.file, 'UTF-8')
      reader.onload = function (e) {
        let fileContent = e.target.result
        console.log(fileContent,"file")
    }
    },
    getAllGroups(){

      getAllGroup().then(response => {
          console.log('resopnsee', response)
          this.groupList = response.data
          this.$vs.loading.close()
        }).catch(error => {
          console.log(error)

          this.$vs.loading.close()
        })
    },
     handleSelected(tr) {
      this.$vs.notify({
        title:`Selected ${tr.id}`,
        text:`Email: ${tr.email}`
      })
        this.$router.push({ name: 'groupMonitor', params: { groupId: tr.id }})
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
