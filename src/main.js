import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Antd from 'ant-design-vue';
import router from "@/router";
import VEmojiPicker  from "v-emoji-picker";

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Antd)
Vue.use(VEmojiPicker)
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
