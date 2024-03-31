<!-- =========================================================================================
    File Name: MailItem.vue
    Description: Mail Item - Displays mail item
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div class="mail__mail-item sm:px-4 px-2 py-6" >
        <!-- MAIL ROW 1 : META -->
        <div class="flex w-full">
            <vs-avatar class="sender__avatar flex-shrink-0 mr-3 border-2 border-solid border-white" :src="user.photo" size="40px"></vs-avatar>

            <div class="flex w-full justify-between items-start">
                <div class="mail__details">
                    <h5 class="mb-1">{{user.first_name }} {{user.last_name }}</h5>
                    <span >{{user.username }}</span>
                </div>

                <div class="mail-item__meta flex items-center">
                    <div class="email__labels hidden sm:flex items-center">
                        <div class="h-3 w-3 rounded-full mr-8" :class="'bg-' + userTags[user.label]"  >
                          {{user.label}}</div>
                    </div>
<!--                    <span>{{user.username  }}</span>-->
                </div>
            </div>
        </div>
        <!-- /MAIL ROW 1 -->

        <!-- MAIL ROW 2 : MSG & ACTIONS -->
<!--        <div class="flex w-full">-->
<!--            <div class="flex items-center ml-1">-->
<!--                <vs-checkbox v-model="isSelectedUser" @click.stop class="vs-checkbox-small ml-0 mr-1"></vs-checkbox>-->
<!--                <feather-icon icon="StarIcon" class="cursor-pointer" :svgClasses="[{'text-warning fill-current stroke-current': mail.isStarred}, 'w-5', 'h-5']" @click.stop="toggleIsStarred"></feather-icon>-->
<!--            </div>-->
<!--            <div class="mail__message truncate ml-3">-->
<!--                <span>{{ mail.message | filter_tags }}</span>-->
<!--            </div>-->
<!--        </div>-->
        <!-- /MAIL ROW 2 -->
    </div>
</template>

<script>
export default{
    props: {
        user: {
            type: Object,
            required: true,
        },
        isUserOpen: {
            type: Boolean,
        },
        isSelected: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            isSelectedUser: this.isSelected,
          userTags:
          {'SIM': "danger",'AUTHCODE': "primary",'ACCOUNT': "warning",'UNKNOWN': "success"},

        }
    },
    watch: {
        isSelected(value) {
            this.isSelectedUser = value
        },
    },
    computed: {
    },
    methods: {
        toggleIsStarred() {
            const payload = {mailId: this.mail.id, value : !this.mail.isStarred}
            this.$store.dispatch('email/toggleIsMailStarred', payload)
        }
    }
}
</script>
