<!-- =========================================================================================
    File Name: ChatLog.vue
    Description: Chat Application - Log of chat
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->
<!-- hasSentPreviousMsg -->
<template>
  <div id="component-chat-log" class="m-8 vs-con-loading__container">
    <div class="fill-row" v-if="noData">
      <div id="div-with-loading" class="vs-con-loading__container">Loading</div>
    </div>
    <el-scrollbar :style="{height:chatHeight}" v-else>
    <div v-for="(msg, index) in chatData" class="msg-grp-container" :key="index" ref="msg">
      <!-- If previouse msg is older than current time -->
      <template v-if="chatData[index-1]">
        <vs-divider v-if="!isSameDay(msg.createTime, chatData[index-1].createTime)">
          <span>{{msg.createTime}}</span>
        </vs-divider>
        <div class="spacer mt-8" v-if="!hasSentPreviousMsg(chatData[index-1].isSend==1, msg.isSend==1)"></div>
      </template>

      <div class="flex items-start" :class="[{'flex-row-reverse' : msg.isSend}]">

        <template v-if="chatData[index-1]">
          <template
            v-if="(!hasSentPreviousMsg(chatData[index-1].isSend==1, msg.isSend==1) || !isSameDay(msg.time, chatData[index-1].createTime))">
            <vs-avatar size="40px" class="m-0 flex-shrink-0" :class="msg.isSend==1 ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
                       :src="senderImg(msg.isSend==1)"></vs-avatar>
          </template>
        </template>

        <template v-if="index == 0">
          <vs-avatar size="40px" class="m-0 flex-shrink-0" :class="msg.isSend ? 'sm:ml-5 ml-3' : 'sm:mr-5 mr-3'"
                     :src="senderImg(msg.isSend==1)"></vs-avatar>
        </template>

        <template v-if="chatData[index-1]">
          <div class="mr-16"
               v-if="!(!hasSentPreviousMsg(chatData[index-1].isSend==1, msg.isSend==1) || !isSameDay(msg.time, chatData[index-1].createTime))"></div>
        </template>

        <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm"
             :class="{'bg-primary-gradient text-white': msg.isSend, 'border border-solid border-grey-light bg-white text-black': !msg.isSend}">
          <!--                    <div class="messageContent" >{{msg.content}}</div>-->
          <div class="messageContent">
                    <span v-for="(content,index) in msg.content" style="font-size: larger;line-height: 30px;">
                      <span v-if="content.isEntity==1" :style="{'background':entityTag[content.entityName]}"
                          style="padding-top: 3px;padding-bottom: 3px;padding-left: 2px;border-radius: 3px;padding-right: 2px;margin-left: 2px;margin-right:2px;ont-size: 10px;position: relative" >

                        <span class="" >
                          {{content.text}}
                        </span>
                        <span class="entityName" style="
                            font-size: xx-small;

                            /*position: absolute;*/
                            bottom:0px;
                            right: 0px;
                            padding-left: 2px;
                            padding-right: 2px;
                            margin-left: 1px;
                            margin-right: 1px;
                            border-radius: 3px;

                            border: 0.5px solid #fff;
                            "
                            :style="{'background': entityTag[content.entityName],color:'#fff'}" >
                          {{content.entityName}}
                        </span>
                      </span>
                      <span v-else>
                        {{content.text}}
                      </span>

<!--                      <span > {{content.entityName}}</span>-->
                    </span>
          </div>
        </div>
      </div>
    </div>
    </el-scrollbar>
  </div>
</template>

<script>
  import contacts from './contacts'
  import {getMsgLogById, getUserInfoById} from "../../api/group";

  export default {
    props: {
      userId: {
        type: Number,
        default: 1534029302
      },
      chatHeight:{
        type: String,
      default: '600px'
      }

    },
    data() {
      return {
        noData:true,
        meInfo: null,
        userInfo: null,
        chatData: [],
        entityTag: {"trade_platform": "rgba(40, 199, 111,0.6)", "aim": "rgba(199, 141, 163,0.6)", "price": "rgba(55, 174, 148,0.6)", "quantity": "rgba(255,110,118,0.6)","company":"rgba(255, 186, 0,0.6)","location":"rgba(255,130,0,0.6)","phonenumber":"rgba(54, 153, 255,0.6)","balance":"rgba(187, 184, 62,0.6)","y":"rgba(155, 143, 250,0.6)"},
                // entityTag: {"trade_platform": "green", "aim": "purple", "price": "success", "quantity": "danger","company":"warning","location":"danger","phonenumber":"primary","balance":"5","y":"6"},

        testColor:"rgba(0,0,0,1)"
      }
    },
    watch:{
      userId(newValue, oldValue) {
        this.chatData = []
        // this.noData=true
        this.$vs.loading({
        container: '#component-chat-log',
        scale: 0.6
      })
        console.log(newValue,oldValue)
        getUserInfoById(newValue).then(response => {
        console.log("Oooo",this.userId)
        console.log("userInfo", response.data)
        this.userInfo = response.data
          this.$vs.loading.close('#div-with-loading > .con-vs-loading')
        // this.noData=false
      }).catch(error => {
        console.log("error", error)
      })
      getMsgLogById(newValue).then(response => {
        console.log("chatData", response.data)
        this.chatData = response.data
        console.log("this.chatData", this.chatData)
         this.$vs.loading.close('#component-chat-log > .con-vs-loading')
        return response.data
      }).catch(error => {
        console.log("error", error)
      })

    },
    chatData: {
    handler(newData, oldData) {
      if (newData.length==0){
        this.noData=true
      }else {
        this.noData=false
      }
    },
    immediate: true,
    deep: true
  }

    },
    created() {
       this.$vs.loading({
        container: '#div-with-loading',
        scale: 0.6
      })
      getUserInfoById(this.userId).then(response => {
        console.log("Oooo",this.userId)
        console.log("userInfo", response.data)
        this.userInfo = response.data
      }).catch(error => {
        console.log("error", error)
      })
      getUserInfoById(0).then(response => {
        console.log("0", response.data)
        this.meInfo = response.data
      }).catch(error => {
        console.log("error", error)
        return {}
      })
      getMsgLogById(this.userId).then(response => {
        console.log("chatData", response.data)
        this.chatData = response.data
          this.$vs.loading.close('#div-with-loading > .con-vs-loading')
        // this.noData=false
        console.log("this.chatData", this.chatData)
        return response.data
      }).catch(error => {
        console.log("error", error)
      })
    },
    computed: {
      contactIndex() {
        return contacts.findIndex(contact => contact.id == this.userId);
      },
      userImg() {
        if (this.contactIndex !== -1) return this.contacts[this.contactIndex].img;
      },
      activeUserImg() {
        return this.$store.state.AppActiveUser.img;
      },
      senderImg() {
        return (isSendByActiveUser) => {
          if (isSendByActiveUser) return this.meInfo.photo;
          else return this.userInfo.photo;
        }
      },
      hasSentPreviousMsg() {
        return (last_sender, current_sender) => last_sender == current_sender
      },
      // getColor(content){
      //       if (content.isEntity==1){
      //         return "bg-green"
      //       }
      // }
    },
    methods: {
      getColor(content) {
        if (content.isEntity == 1) {
          return "rounded pl-3 pr-3 border border-solid border-grey-light text-white bg-" + this.entityTag[content.entityName] + " border-" + this.entityTag[content.entityName]
        } else {
          return null
        }
      },
      isSameDay(time_to, time_from) {
        return time_to == time_from
        // console.log(time_to,time_from)
        //   const date_time_to = new Date(Date.parse(time_to))
        //   const date_time_from = new Date(Date.parse(time_from));
        // console.log(date_time_to,date_time_from)
        //   return date_time_to.getFullYear() === date_time_from.getFullYear() &&
        //       date_time_to.getMonth() === date_time_from.getMonth() &&
        //       date_time_to.getDate() === date_time_from.getDate();
      },
      toDate(time) {
        const locale = "en-us";
        const date_obj = new Date(Date.parse(time));
        const monthName = date_obj.toLocaleString(locale, {
          month: 'short'
        });
        return date_obj.getDate() + ' ' + monthName;
      },
      scrollToBottom() {
        this.$nextTick(() => {
          this.$parent.$el.scrollTop = this.$parent.$el.scrollHeight
        });
      }
    },
    updated() {
      this.scrollToBottom();
    },
    mounted() {
      this.scrollToBottom();
    }
  }
</script>
<style scoped>
 .fill-row {
   flex: 0 0 100%;
   margin-top: 20px;
   margin-bottom: 20px;
 }
#div-with-loading{
  width: 200px;
  height: 200px;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  box-shadow:0px 3px 10px 0px rgba(0,0,0,.1)
}
.bg-orange {
  background-color: #FFB835DC;
}
  .bg-pink {
  background-color: #f8b6c3 !important;
}
 .bg-purple {
  background-color: #b567d6 !important;
}
.bg-green {
  background-color: #5872e0 !important;
}
.bg-5 {
  background-color:#37ae94!important;
}
.bg-6 {
  background-color:#e02f8c!important;
}
</style>
