<template>
  <div>
    <el-row>
      <el-col :span="12">
        <vx-card title="QQ机器人绑定账号" class="mr-4 " style="height: 600px">
          <vs-list v-for="(bot,index) in QQBots">
            <!--              <vs-avatar :src="bot.photo"/>-->
            <!--             <vs-divider></vs-divider>-->
            <vs-list-item :title="bot.username" :subtitle="bot.id">
              <template slot="avatar">
                <vs-avatar :src="bot.photo"/>

              </template>
              <vs-switch color="warning" v-model="val2[index]" class="mr-0"/>
            </vs-list-item>
            <vs-divider></vs-divider>
          </vs-list>
        </vx-card>
      </el-col>
      <el-col :span="12">
        <vx-card title="Telegram机器人绑定账号" class="ml-4 " style="height: 600px">
          <vs-list v-for="(bot,index) in TGbots">
            <!--              <vs-avatar :src="bot.photo"/>-->
            <!--             <vs-divider></vs-divider>-->
            <vs-list-item :title="bot.username" :subtitle="bot.id">
              <template slot="avatar">
                <vs-avatar :src="bot.photo"/>

              </template>
              <vs-switch color="warning" v-model="val[index]" class="mr-0"/>
            </vs-list-item>
            <vs-divider></vs-divider>
          </vs-list>

        </vx-card>
      </el-col>
    </el-row>


  </div>
</template>

<script>
  import {getAllQQBOTS, getAllTGBOTS} from "../../api/group";

  export default {
    name: "botSetting",
    data() {
      return {
        TGbots: [],
        QQBots: [],
        choosQQ:0,
        val: [],
         val2: [],
        choosTG: 0,
      }
    },
    created() {
      this.getAllTGBot()
      this.getAllQQBot()
    },
    methods: {
      getAllQQBot() {
        this.$vs.loading({
          type: 'sound',
        })
        getAllQQBOTS().then(response => {
          console.log(response)
          this.QQBots = response.data
          this.val2=[true,false]
          this.$vs.loading.close()
          this.$vs.notify({
            color: 'success',
            title: `成功`,
            text: '数据获取成功'
          })
        })
          .catch(error => {
            console.log(error)
            this.$vs.loading.close()
            this.$vs.notify({
              color: 'error',
              title: `错误`,
              text: '出错了请重试'
            })
          })
      },
      getAllTGBot() {
        this.$vs.loading({
          type: 'sound',
        })
        getAllTGBOTS().then(response => {
          console.log(response)
          this.TGbots = response.data
          this.val=[false,false,true]
          this.$vs.loading.close()
          this.$vs.notify({
            color: 'success',
            title: `成功`,
            text: '数据获取成功'
          })
        })
          .catch(error => {
            console.log(error)
            this.$vs.loading.close()
            this.$vs.notify({
              color: 'error',
              title: `错误`,
              text: '出错了请重试'
            })
          })
      }
    },
    watch: {
      val2: {
        handler(newVal, oldVal) {
          var i=0
          for (var j=0;j<newVal.length;j++){
            if(newVal[j]!=oldVal[j]){
              i=j
            }
          }
          this.choosQQ = i
          console.log("currentTGID", this.QQBots[i].id)
        },
        deep: true
      },
      val: {
        handler(newVal, oldVal) {
          var i = newVal.indexOf(true)
          this.choosTG = i
          console.log("currentTGID", this.TGbots[i].id)
        },
        deep: true
      },
    },
  }
</script>

<style scoped>

</style>
