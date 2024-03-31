<template>
  <div class="email__email-sidebar h-full">
    <div class="m-6 clearfix">
      <vs-button size="large" class="bg-primary-gradient w-full" icon-pack="feather" icon="icon-edit"
                 @click="activePrompt = true">Compose
      </vs-button>
    </div>

    <!-- compose email -->
    <vs-prompt
      class="email-compose"
      vs-title="New Message"
      vs-accept-text="Send"
      @vs-cancel="clearFields"
      @vs-accept="sendMail"
      @vs-close="clearFields"
      :vs-is-valid="validateForm"
      :vs-active.sync="activePrompt">
      <VuePerfectScrollbar class="scroll-area p-4" :settings="settings">
        <form @submit.prevent>
          <vs-input v-validate="'required|email'" name="mailTo" label-placeholder="To" v-model="mailTo"
                    class="w-full mb-6" :danger="!validateForm && mailTo != ''" val-icon-danger="clear"
                    :success="validateForm" val-icon-success="done" :color="validateForm ? 'success' : 'danger'"/>
          <vs-input name="mailSubject" label-placeholder="Subject" v-model="mailSubject" class="w-full mb-6"/>
          <vs-input name="mailCC" label-placeholder="CC" v-model="mailCC" class="w-full mb-6"/>
          <vs-input name="mailBCC" label-placeholder="BCC" v-model="mailBCC" class="w-full mb-6"/>
          <quill-editor v-model="mailMessage" :options="editorOption"></quill-editor>
          <vs-upload multiple text="Attachments" :show-upload-button="false"/>
        </form>
      </VuePerfectScrollbar>
    </vs-prompt>

    <VuePerfectScrollbar class="email-scroll-area" :settings="settings">
      <div class="px-6 pb-2 flex flex-col">
        <ul class="page-suggestions-list">
          <li class="page-suggestion flex items-center mb-4 cursor-pointer" v-for="group in groupList" :key="group.id" @click="updateActivateGroup(group.id)" :class="{'bg-primary-gradient text-white shadow-lg': activateGroup==group.id}">
            <div class="mr-3">
              <vs-avatar class="m-0" :src="group.photo" size="35px"/>
            </div>
            <div class="leading-tight">
              <p class="font-medium">{{ group.username }}</p>
              <span class="text-xs">{{ group.date }}</span>
            </div>
            <div class="ml-auto">
              <div class="flex">
                <feather-icon icon="StarIcon" svgClasses="h-4 w-4" class="mr-2 cursor-pointer"></feather-icon>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <vs-divider></vs-divider>
      <div class="email__labels px-6 py-4">
        <h5 class="mb-8">Labels</h5>
        <div class="email__lables-list">
          <div class="email__label flex items-center mb-4 cursor-pointer" v-for="(tag, index) in userTags" :key="index"
               @click="updateFilter(tag.value)">
            <div class="ml-1 h-4 w-4 rounded-full mr-4" :class="'bg-' + tag.color"></div>
            <span class="text-lg" :class="{'text-primary': mailFilter == tag.value}">{{ tag.text }}</span>
          </div>
        </div>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import {quillEditor} from 'vue-quill-editor'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import {getAllGroup} from "../../api/group";
  import { mapMutations } from 'vuex'

  export default {
    props: {
      emailTags: {
        type: Array,
        required: true,
      },
      mailFilter: {
        type: String,
        required: true,
      }
    },
    data() {
      return {
        groupList:[],
        activateGroup:0,
        userTags: [
          {text: 'SIM', value: 'SIM', color: "danger"},
          {text: 'code', value: 'AUTHCODE', color: "primary"},
          {text: 'ACCOUNT', value: 'ACCOUNT', color: "warning"},
          {text: 'Unknown', value: 'Unknown', color: "success"},
        ],
        userData:[],
        activePrompt: false,
        mailTo: '',
        mailSubject: '',
        mailCC: '',
        mailBCC: '',
        mailMessage: '',
        editorOption: {
          modules: {
            toolbar: [['bold', 'italic', 'underline', 'strike', 'link', 'blockquote', 'code-block'], [{'header': 1}, {'header': 2}], [{'list': 'ordered'}, {'list': 'bullet'}], [{'font': []}],],
          },
          placeholder: 'Message'
        },
        settings: {
          maxScrollbarLength: 60,
          wheelSpeed: 0.30,
        },
      }
    },
    computed: {
      isActiveGroup() {
        return (groupId) => groupId == this.activeGroup
      },
      validateForm() {
        return !this.errors.any() && this.mailTo != '';
      },
      unreadMails() {
        return (mailType) => this.$store.getters['email/unreadMails'](mailType);
      },
      draftMails() {
        return this.$store.getters['email/NumdraftMails'];
      },
    },
    methods: {
      ...mapMutations([
      'UPDATE_MANAGEGROUPACTIVE', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
      updateActivateGroup(groupId){
        console.log("update",groupId)
        this.UPDATE_MANAGEGROUPACTIVE(groupId)
        console.log(this.$store.state.manageGroupActive,"state")
      },
      updateFilter(filterName) {
        this.$store.dispatch('email/updateMailFilter', filterName);
        this.$emit('closeSidebar', false);
      },
      // compose mail methods
      clearFields() {
        this.mailTo = '';
        this.mailSubject = '';
        this.mailCC = '';
        this.mailBCC = '';
        this.mailMessage = '';
      },
      sendMail() {
      },
    },
    components: {
      quillEditor,
      VuePerfectScrollbar
    },
    created() {
      this.$vs.loading({
        type:'sound',
      })
      getAllGroup().then(response => {
          console.log('resopnsee', response)
          this.groupList = response.data
          this.$vs.loading.close()
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })
    }
  }
</script>
