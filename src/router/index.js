import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'

import { setTitle } from '@/libs/util'
import iView from 'iview'

Vue.use(Router)

// 路由的加载模式的问题，因为vue-router的模式不同,history ---> hash
const router = new Router({
    routes,
    mode: 'hash',
    base:'ErythroidDB'

})




// 每改变一个路由就记录
router.afterEach(to => {
    setTitle(to, router.app)
    iView.LoadingBar.finish()
    window.scrollTo(0, 0)
})


// 导出router 
export default router