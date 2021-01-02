import {
    getBreadCrumbList,
    getHomeRoute,
    localSave,
    // 和语言设置有关
    localRead
}


from '@/libs/util'


import router from '@/router'
import routers from '@/router/routers'
import config from '@/config'
const { homeName } = config

export default {
    state: {

        breadCrumbList: [],

        homeRoute: {},
        // 语言设置
        local: localRead('local'),


        CurrentPageToken:'',
    },
    getters: {
        menuList: (state, getters, rootState) => getMenuByRouter(routers, rootState.user.access),

    },
    mutations: {

        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
        },

        setHomeRoute(state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        },

        // 存贮state lang 语言
        setLocal(state, lang) {
            localSave('local', lang)
            state.local = lang
        },

        //存储用户浏览页面状态Token 
        setCurrentPageToken(state, CPageToken) {
            localSave('CurrentPageToken', CPageToken)
            state.CurrentPageToken = CPageToken
        },


    }



}