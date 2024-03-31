<template lang="html">
  <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card class="pl-5 pr-5">
          <div slot="no-body" class="mt-4">
           <vs-table
      :sst="true"
      @selected="handleSelected"
      @search="handleSearch"
      @change-page="handleChangePage"
      @sort="handleSort"
      v-model="selected"
      :total="totalItems"
      pagination
      max-items="13"
      search
      :data="userData">
      <template slot="header">
        <h3>
          卡商用户索引
        </h3>
      </template>
      <template slot="thead">
        <vs-th sort-key="email">
          Id
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
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].id">
            {{data[indextr].id}}
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

        </vx-card>
      </div>
    </div>
</template>

<script>
  import {getAllUserApi} from "../../../api/group";

export default {
  data:()=>({
    selected:[],
    totalItems:10,
    userData:[]
  }),
  created() {
    this.getAllUsers()
  },
  methods:{
    getAllUsers(){
      this.$vs.loading({
        type:'sound',
        })
    getAllUserApi().then(response => {
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

     handleSelected(tr) {
      this.$vs.notify({
        title:`Selected ${tr.id}`,
      })
       this.$router.push({ name: 'userView', params: { userId: tr.id }})
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
