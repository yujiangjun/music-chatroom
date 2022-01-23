import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Antd from 'ant-design-vue';
import router from "@/router";
import VEmojiPicker  from "v-emoji-picker";
import Vuex from 'vuex'

import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Antd)
Vue.use(VEmojiPicker)
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 0,
        userInfo: {}
    },
    mutations: {
        increment (state) {
            state.count++
        },
        saveUserInfo (state, payload){
            state.userInfo = payload
        }
    }
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
