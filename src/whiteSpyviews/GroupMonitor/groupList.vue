<template lang="html">
  <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">


        <vx-card title="群组监控索引">
          <div slot="no-body" class="mt-4 ml-5">
<!--            <el-upload-->
<!--  class="upload-demo "-->
<!--  action=""-->
<!--  :http-request="addFile"-->
<!--  :show-file-list='false' >-->
<!--  <el-button size="mini" type="primary">导入</el-button>-->
<!--</el-upload>-->
           <vs-table
      :sst="true"
      @selected="handleSelected"
      @search="handleSearch"
      @change-page="handleChangePage"
      @sort="handleSort"
      v-model="selected"
      :total="totalItems"
      pagination
      max-items="7"
      search
      :data="groupList">
<!--      <template slot="header">-->
<!--        <h3>-->
<!--          x-->
<!--        </h3>-->
<!--      </template>-->
      <template slot="thead">
        <vs-th sort-key="email">
          ID
        </vs-th>
        <vs-th sort-key="username">
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
<!--        <vs-th sort-key="id">-->
<!--          黑产人员占比-->
<!--        </vs-th>-->
        <vs-th sort-key="id">
          平台
        </vs-th>
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
<!--          <vs-td :data="data[indextr].id">-->
<!--            <el-progress percentage="80"></el-progress>-->
<!--          </vs-td>-->
           <vs-td :data="data[indextr].id">
            Telegram
          </vs-td>
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
import {getAllGroup} from "../../api/group";

export default {
  data:()=>({
    selected:[],
    totalItems:10,
    users:[
      {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "website": "hildegard.org",
      },
      {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "website": "anastasia.net",
      },
      {
        "id": 3,
        "name": "Clementine Bauch",
        "username": "Samantha",
        "email": "Nathan@yesenia.net",
        "website": "ramiro.info",
      },
      {
        "id": 4,
        "name": "Patricia Lebsack",
        "username": "Karianne",
        "email": "Julianne.OConner@kory.org",
        "website": "kale.biz",
      },
      {
        "id": 5,
        "name": "Chelsey Dietrich",
        "username": "Kamren",
        "email": "Lucio_Hettinger@annie.ca",
        "website": "demarco.info",
      },
      {
        "id": 6,
        "name": "Mrs. Dennis Schulist",
        "username": "Leopoldo_Corkery",
        "email": "Karley_Dach@jasper.info",
        "website": "ola.org",
      },
      {
        "id": 7,
        "name": "Kurtis Weissnat",
        "username": "Elwyn.Skiles",
        "email": "Telly.Hoeger@billy.biz",
        "website": "elvis.io",
      },
      {
        "id": 8,
        "name": "Nicholas Runolfsdottir V",
        "username": "Maxime_Nienow",
        "email": "Sherwood@rosamond.me",
        "website": "jacynthe.com",
      },
      {
        "id": 9,
        "name": "Glenna Reichert",
        "username": "Delphine",
        "email": "Chaim_McDermott@dana.io",
        "website": "conrad.com",
      },
      {
        "id": 10,
        "name": "Clementina DuBuque",
        "username": "Moriah.Stanton",
        "email": "Rey.Padberg@karina.biz",
        "website": "ambrose.net",
      }
    ],
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
  methods:{
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
          this.$vs.notify({
          color:'success',
          title:`成功`,
          text:'数据获取成功'
          })
        }).catch(error => {
          console.log(error)

          console.log(error)
      this.$vs.loading.close()
          this.$vs.notify({
          color:'error',
          title:`错误`,
          text:'出错了请重试'
          })
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
