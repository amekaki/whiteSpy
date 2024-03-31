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
    <div id="component-chat-log" class="m-8" v-if="chatData">
        <div v-for="(msg, index) in chatData" class="msg-grp-container" :key="index">
            <!-- If previouse msg is older than current time -->
            <template v-if="chatData[index-1]">
                <vs-divider v-if="!isSameDay(msg.sendTime, chatData[index-1].sendTime)">
                    <span>{{ toDate(msg.sendTime) }}</span>
                </vs-divider>
<!--                <div class="spacer mt-8" v-if="!hasSentPreviousMsg(chatData[index-1].isSent, msg.isSent)"></div>-->
            </template>

            <div class="flex items-start" >
                <template v-if="chatData[index]">
                    <template >
                        <vs-avatar size="40px" class="m-0 flex-shrink-0 sm:mr-5 mr-3" :src="msg.sender.avatarPath"></vs-avatar>
                    </template>
                </template>

<!--              -->
<!--                <template v-if="chatData.msg[index-1]">-->
<!--                    <div class="mr-16" v-if="!(!hasSentPreviousMsg(chatData.msg[index-1].isSent, msg.isSent) || !isSameDay(msg.time, chatData.msg[index-1].time))"></div>-->
<!--                </template>-->

                <div class="msg break-words relative shadow-md rounded py-3 px-4 mb-2 rounded-lg max-w-sm border border-solid border-grey-light bg-white" >
                    <span>{{ msg.message }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import contacts from './contacts'

export default{
    props: {
        chatData: {
            type:Object,
            required: true,
        }
    },
    data() {
        return {
            contacts: contacts,
        }
    },
    computed: {
        hasSentPreviousMsg() {
            return (last_sender, current_sender) => last_sender == current_sender
        },
    },
    methods: {
      showChatData(){
        console.log("chatdata",this.chatData)
      },
        isSameDay(time_to, time_from) {
            const date_time_to = new Date(Date.parse(time_to))
            const date_time_from = new Date(Date.parse(time_from));
            return date_time_to.getFullYear() === date_time_from.getFullYear() &&
                date_time_to.getMonth() === date_time_from.getMonth() &&
                date_time_to.getDate() === date_time_from.getDate();
        },
        toDate(time) {
            const locale = "en-us";
            const date_obj = new Date(Date.parse(time));
            const monthName= date_obj.toLocaleString(locale, {
                month: 'short'
            });
            return date_obj.getDate() + ' '  + monthName;
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
    },
  created() {
    console.log(chatData.msg)
  }
}
</script>
