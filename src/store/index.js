// store 管理
import Vue from 'vue'
import Vuex from 'vuex'

// import user from './module/user'
import app from './module/app'

// 用Vuex 管理store
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        app
    }
})