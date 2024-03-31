<template>
  <div>
   <vx-card title="用户设置" style="height: 800px" >
     <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-start flex-col sm:flex-row">
          <img :src="require(`@/assets/images/portrait/small/${activeUserImg}`)" class="mr-8 rounded h-24 w-24" />
          <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
          <div>
            <input type="file" class="hidden" ref="update_avatar_input"  accept="image/*">

          </div>
        </div>
      </div>
    </div>
     <div class="vx-row" >
            <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                      <vs-button color="primary" type="border" size="small" class="mt-4 ml-3">修改头像</vs-button>

            <!-- <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button> -->
            </div>
      <div class="vx-row">
      <div class="vx-col md:w-1/2 w-full">
        <vs-input class="w-full mt-4" label="用户名" v-model="username"  name="username" />
        <vs-input class="w-full mt-4" label="手机号码" v-model="phoneNumber"  name="phoneNumber" />
      </div>

    </div>
      <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2"  >保存设置</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning">重置</vs-button>
        </div>
      </div>
    </div>
   </vx-card>

  </div>
</template>

<script>
    export default {
        name: "userSetting",
      data(){
          return{
            role_local:"admin",
            username:"Admin",
            phoneNumber:"18956778852",
            roleOptions: [
        { label: "Admin",  value: "admin" },
        { label: "User",  value: "user" },
        { label: "Staff",  value: "staff" },
      ],

        }
      },
      computed:{
          user_displayName() {
            return JSON.parse(localStorage.getItem('userInfo')).displayName
        },
        activeUserImg() {
            return JSON.parse(localStorage.getItem('userInfo')).photoURL || this.$store.state.AppActiveUser.img;
        }
      }
    }
</script>

<style scoped>

</style>
