<!-- =========================================================================================
    File Name: VxSidebarItem.vue
    Description: Sidebar item component. Extends vuesax framework's 'vs-sidebar-item' component
    Component Name: VxSidebarItem
    ----------------------------------------------------------------------------------------
    Item Name: Vuesax Admin - VueJS Dashboard Admin Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div class="vs-sidebar--item" v-if="canSee">
        <router-link v-if="to" :to="to[0]"  :target="target" exact>
<!--            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon" color="rgb(70, 150, 0)">-->
<!--            </vs-icon>-->
              <vs-icon :icon="MaterialIcon" size="25px" color="primary" v-if="isCurrentPathInList"></vs-icon>

              <vs-icon :icon="MaterialIcon"  size="25px" v-else></vs-icon>
<!--            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>-->
            <slot></slot>
        </router-link>
        <a v-else :target="target" :href="href">
            <vs-icon v-if="!featherIcon" :icon-pack="iconPack" :icon="icon">
            </vs-icon>
            <feather-icon :icon="icon" :class="{'w-3 h-3': iconSmall}" v-else></feather-icon>
            <slot></slot>
        </a>
    </div>
</template>

<script>
export default {
    name: 'VxSidebarItem',
    props: {
      currentPath: {
        default: '/',
        type: String
      },
        icon: {
            default: "",
            type: String
        },
      MaterialIcon: {
            default: "",
            type: String
        },
        iconSmall: {
            default: false,
            type: Boolean,
        },
        iconPack: {
            default: 'material-icons',
            type: String
        },
        href: {
            default: '#',
            type: String
        },
        to: {
            default:null,
            type: Object
        },
        index: {
            default: null,
            type: [String, Number]
        },
        featherIcon: {
            default: true,
            type: Boolean,
        },
        target: {
            default: '_self',
            type: String,
        },
        isDisabled: {
            default: false,
            type: Boolean
        }
    },
    data() {
        return {
            activeLink: false,
          isCurrentPathInList:false
        }
    },
    watch: {
        '$route'() {
            this.CheckIsActive()
        }
    },
    methods: {
      isInArray(arr,value){
console.log("panduan  chenggong",arr,value)
    for(var i = 0; i < arr.length; i++){
        if(value === arr[i]){
          console.log("panduan  ",arr,value)
            return true;
        }
    }
    return false;
},
        CheckIsActive() {
          console.log(this.$route.path)
            if (this.to) {
                if(this.isInArray(this.to,this.$route.path)) this.isCurrentPathInList = true
                else this.isCurrentPathInList = false
                // if (this.$route.path.slice(1).includes(this.to.slice(1)) && this.to.slice(1)) this.activeLink = true
                // else this.activeLink = false
            }
        }
    },
    computed: {
      isCurrentPath(){

       if (this.isInArray(this.to,this.$route.path)){
         console.log("判断",this.to,this.currentPath)
         return true
       }else{
         return false
       }

      },
        canSee() {
            // this.$acl.check(this.$store.state.userRole);
            // if(this.to) {
            //     return this.$acl.check(this.$router.match(this.to).meta.rule)
            // }
            return true
        }
    },
    updated() {
        this.CheckIsActive();
    }
}
</script>
