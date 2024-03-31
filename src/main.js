/*=========================================================================================
  File Name: main.js
  Description: main vue(js) file
  ----------------------------------------------------------------------------------------
  Item Name: Vuesax Admin - VueJS Dashboard Admin Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/


import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// Vuesax Component Framework
import Vuesax from 'vuesax'
import 'material-icons/iconfont/material-icons.css' //Material Icons
import 'vuesax/dist/vuesax.css'; // Vuesax
Vue.use(Vuesax)

// 引入echarts
import * as echarts from 'echarts';

Vue.prototype.$echarts = echarts
// //Import Froala Editor
// import 'froala-editor/js/plugins.pkgd.min.js';
// //Import third party plugins
// import 'froala-editor/js/third_party/embedly.min';
// import 'froala-editor/js/third_party/font_awesome.min';
// import 'froala-editor/js/third_party/spell_checker.min';
// import 'froala-editor/js/third_party/image_tui.min';
// // Import Froala Editor css files.
// import 'froala-editor/css/froala_editor.pkgd.min.css';

// // Import and use Vue Froala lib.
// import VueFroala from 'vue-froala-wysiwyg'
// Vue.use(VueFroala)
Vue.config.productionTip = false

// axios
import axios from 'axios'
Vue.prototype.$http = axios

// Theme Configurations
import '../themeConfig.js'


// Algolia - Instant Search
import InstantSearch from 'vue-instantsearch';
Vue.use(InstantSearch);


// Firebase
import '@/firebase/firebaseConfig'


// Auth0 Plugin
import AuthPlugin from "./plugins/auth";
Vue.use(AuthPlugin);


// ACL
import acl from './acl/acl'


// Globally Registered Components
import './globalComponents.js'


// Styles: SCSS
import './assets/scss/main.scss'


// Tailwind
import '@/assets/css/main.css';





// Vuex Store
import store from './store/store'


// i18n
import i18n from './i18n/i18n'


// Vuesax Admin Filters
import './filters/filters'


// Clipboard
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard);

import router from './router'
// Tour
import VueTour from 'vue-tour'
Vue.use(VueTour)
require('vue-tour/dist/vue-tour.css')


// VeeValidate
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);


// Google Maps
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.use(VueGoogleMaps, {
    load: {
        // Add your API key here
        key: 'API_KEY',
        libraries: 'places', // This is required if you use the Auto complete plug-in
    },
})

// Vuejs - Vue wrapper for hammerjs
import { VueHammer } from 'vue2-hammer'
Vue.use(VueHammer)


// PrismJS
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'


// Feather font icon
require('./assets/css/iconfont.css')


// Vue select css
// Note: In latest version you have to add it separately
// import 'vue-select/dist/vue-select.css';

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)
// Vue Router



Vue.config.productionTip = false

new Vue({
    router,
    store,
    i18n,
    acl,
    render: h => h(App)
}).$mount('#app')
