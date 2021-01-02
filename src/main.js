// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// 使用store
import store from './store'
import router from './router'
import iView from 'iview';
import i18n from '@/locale'
import 'iview/dist/styles/iview.css';
// import $ from 'jquery'
import config from '@/config'
import echarts from "echarts"
import * as Highcharts from 'highcharts';
import * as highchartsSankey from 'highcharts/modules/sankey';
highchartsSankey(Highcharts);
import HighchartsVue from 'highcharts-vue'
// import Highcharts from 'highcharts'
import drilldown from 'highcharts/modules/drilldown'
import mapInit from 'highcharts/modules/map'
import exportingInit from 'highcharts/modules/exporting'
import loadHighchartsMore from 'highcharts/highcharts-more';



Vue.prototype.$echarts = echarts;
loadHighchartsMore(Highcharts)
drilldown(Highcharts)
mapInit(Highcharts)
exportingInit(Highcharts)
Vue.use(HighchartsVue)



Vue.use(iView, {
    i18n: (key, value) => i18n.t(key, value),
    transfer: true,
    size: 'large',
    select: {
        arrow: 'md-arrow-dropdown',
        arrowSize: 20
    }
});


/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
    store,
    i18n,
    components: { App },
    // template: '<App/>'
    render: h => h(App)

})