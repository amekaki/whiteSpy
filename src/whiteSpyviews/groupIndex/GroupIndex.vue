<!-- =========================================================================================
    File Name: Chat.vue
    Description: Chat Application - Stay connected
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="chat-app"  class="border border-solid d-theme-border-grey-light rounded relative overflow-hidden">
    <vs-sidebar  class="items-no-padding" parent="#chat-app" :click-not-close="clickNotClose"
                :hidden-background="clickNotClose" v-model="isChatSidebarActive" id="chat-list-sidebar">

      <div class="chat__profile-search flex p-4">
        <vs-input icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full no-icon-border"
                  placeholder="检索telegram群组" @keyup.enter="searchGroups( 'sound')" v-model="searchQuery"/>
      </div>

      <vs-divider class="d-theme-border-grey-light m-0"/>
      <VuePerfectScrollbar class="chat-scroll-area pt-4" :settings="settings">

        <!-- ACTIVE CHATS LIST -->
        <div class="chat__chats-list mb-8" v-if="groupResult">
          <h3 class="text-primary mb-5 px-4">查询结果:</h3>
          <ul class="chat__active-chats bordered-items">
            <li class="cursor-pointer" v-for="(group, index) in groupList" :key="index"
                @click="updateActiveGroup(group.id,group.username,'sound')">
              <chat-contact :groupInfo="group" :introduce="18-10-9"
                            :isActiveGroup="isActiveGroup(group.id)"></chat-contact>
            </li>
          </ul>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>

    <!-- RIGHT COLUMN -->
    <div v-if="groupChatResult"
      class="chat__bg app-fixed-height chat-content-area border border-solid d-theme-border-grey-light border-t-0 border-r-0 border-b-0"
      :class="{'sidebar-spacer--wide': clickNotClose, 'flex items-center justify-center': activeGroup === null}">
      <template v-if="activeGroup">
        <div class="chat__navbar">
          <chat-navbar :isSidebarCollapsed="!clickNotClose" :user-id="activeGroup" :isPinnedProp="isChatPinned"
                       @openContactsSidebar="toggleChatSidebar(true)" @showProfileSidebar="updateUserProfileId"
                       @toggleIsChatPinned="toggleIsChatPinned"></chat-navbar>
        </div>
        <el-button @click="addGroup(activeGroup)">添加该群组</el-button>
        <VuePerfectScrollbar class="chat-content-scroll-area border border-solid d-theme-border-grey-light"
                             :settings="settings" ref="chatLogPS">
          <div class="chat__log" ref="chatLog">
            <chat-log :chatData="chatData" v-if="activeGroup"></chat-log>
          </div>
        </VuePerfectScrollbar>
      </template>
      <template v-else>
        <div class="flex flex-col items-center">
          <feather-icon icon="MessageSquareIcon" class="mb-4 bg-white p-8 shadow-md rounded-full"
                        svgClasses="w-16 h-16"></feather-icon>
          <h4 class=" py-2 px-4 bg-white shadow-md rounded-full cursor-pointer" @click.stop="toggleChatSidebar(true)">
            点击群组查看对话记录</h4>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import contacts from './contacts'
  import ChatContact from "./GroupIndexContact.vue"
  import UserProfile from "./UserProfile.vue"
  import ChatNavbar from './GroupIndexNavbar.vue'
  import ChatLog from './GroupIndexLog.vue'
  import {addGroup, deleteGroupsById, getGroupChatRecord, getGroupSearchResult} from "../../api/group";

  export default {
    name: 'vx-sidebar',
    data() {
      return {

        active: true,
        groupResult:true,
        groupChatResult:true,
        isHidden: false,
        contacts: contacts,
        searchContact: "",
        groupList: [],
        searchQuery:"",
        activeProfileSidebar: false,
        activeGroup: null,
        userProfileId: -1,
        typedMessage: "",
        isChatPinned: false,
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        },
        clickNotClose: true,
        isChatSidebarActive: true,
        windowWidth: window.innerWidth,
        chatData:[]
      }
    },
    computed: {
      isActiveGroup() {
        return (userId) => userId == this.activeGroup
      }
    },
    methods: {
      acceptAlert(){
        this.$vs.loading({
        type:'sound',
      })
        addGroup(this.activeGroup).then(response => {
          console.log('resopnsee', response)
          this.$vs.loading.close()
          this.$vs.dialog({
        color:'success',
        title: `成功`,
        text: '群组添加成功'
      })
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })


    },
      addGroup(activeGroup){
        console.log("addgroup",activeGroup)
          this.$vs.dialog({
        type:'confirm',
        color: 'success',
        title: `确认添加`,
        text: '是否确认添加群组'+activeGroup,
        accept:this.acceptAlert
      })
      },
      searchGroups(type) {
        console.log(this.searchQuery)
        this.$vs.loading({
        type:'sound',
      })
        getGroupSearchResult(this.searchQuery).then(response => {
          console.log('resopnsee', response)
          this.groupList = response.data
          this.$vs.loading.close()
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })
      },
      updateActiveGroup(groupId,groupName,type) {
        this.activeGroup = groupId;
        this.$vs.loading({
        type:type,
      })
        getGroupChatRecord(groupName).then(response => {
          console.log('resopnseRecord', response)
          this.chatData=response.data
          this.$vs.loading.close()
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })
        console.log(groupId)
      },
      toggleIsChatPinned(value) {
        this.isChatPinned = value;
      },
      handleWindowResize(event) {
        this.windowWidth = event.currentTarget.innerWidth;
        this.setSidebarWidth();
      },
      setSidebarWidth() {
        if (this.windowWidth < 1200) {
          this.isChatSidebarActive = this.clickNotClose = false;
        } else {
          this.isChatSidebarActive = this.clickNotClose = true;
        }
      },
      toggleChatSidebar(value = false) {
        if (!value && this.clickNotClose) return
        this.isChatSidebarActive = value;
      }
    },
    components: {
      VuePerfectScrollbar,
      ChatContact,
      UserProfile,
      ChatNavbar,
      ChatLog,
    },
    created() {
      this.$nextTick(() => {
        window.addEventListener('resize', this.handleWindowResize);
      })
      this.setSidebarWidth();
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleWindowResize)
    },
  }
</script>

<style lang="scss">
  @import "@/assets/scss/vuesax/apps/chat.scss";
</style>
