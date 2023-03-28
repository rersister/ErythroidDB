<template>
  <div>
    <Header>
    </Header>


    <body v-if="ifshow_bread">
      <div class="bigd-container bodyStyle">
        <div class="layout" >
          <!-- <div class='header'>
                            <div class="layout-logo">EryDB: Erythroid Database</div>                  
                            <div class="layout-nav"> 
                                <ul class=" menu  menu-dark menu-horizontal" v-for="(value,index) in values" :key="index">
                                    
                                    <router-link :to="value.link">
                                        <li class="menu-item" @click="cg_current_index(index)" :class="{'bg_color':current_index==index}"><i class="icon icon-ios-navigate"></i>
                                        <Icon class="my_icon" :type="value.type"></Icon>{{value.name}}
                                        </li>
                                    </router-link>
                                    </ul>
                            </div>
                                                
                    </div> -->
          <!-- </Menu> -->
          <Content class="my_content">
            <header-bar></header-bar>

            <Content>
              <Card>
                <div>
                  <router-view />
                  <Back-top></Back-top>
                </div>
              </Card>
            </Content>

            <br>
            <Footer class="layout-footer-center"
              >
              <!-- <span class="my_footer">
                Copyright ©2018-2019 Guangmin Zheng.&copy;<a
                  href="https://people.ucas.edu.cn/~0009899"
                  target="_blank"
                  title="北京基因组研究所方向东"
                  >Fang's Lab.</a
                >
                All Rights Reserved.</span> -->

            </Footer>
          </Content>

          <!-- </Layout> -->
        </div>
      </div>

      
   

      <footer class="bigd-footer" style="font-family: Arial">
        <div class="bigd-container">
          <div class="bigd-panel bigd-panel-default">
            <div class="bigd-panel-body">
              <div class="bigd-row">
                <div class="bigd-col-md-2">
                  <a href="https://bigd.big.ac.cn/"
                    ><img
                      src="https://bigd.big.ac.cn/cdn/image/CNCB-NGDC.png"
                      class="bigd-img-responsive"
                      style="margin-top: calc((15/1920) * 100vw);"
                  /></a>
                  <ul class="bigd-list-unstyled">
                    <li><a href="https://bigd.big.ac.cn/about">About NGDC</a></li>
                    <li><a href="https://bigd.big.ac.cn/people">People</a></li>
                    <li><a href="https://bigd.big.ac.cn/mission">Mission</a></li>
                    <li>
                      <a href="https://bigd.big.ac.cn/board">Advisory Board</a>
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/structure"
                        >Organizational Structure</a
                      >
                    </li>
                    <li><a href="https://bigd.big.ac.cn/history">History</a></li>
                    <li>
                      <a href="https://bigd.big.ac.cn/annual-report"
                        >Annual Reports</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="bigd-col-md-2">
                  <h3>Research & Resources</h3>
                  <ul class="bigd-list-unstyled">
                    <li>
                      <a href="https://bigd.big.ac.cn/databases">Databases</a>
                    </li>
                    <li><a href="https://bigd.big.ac.cn/tools">Tools</a></li>
                    <li>
                      <a href="https://bigd.big.ac.cn/standards">Standards</a>
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/research"
                        >Topics & Projects</a
                      >
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/publications"
                        >Publications</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="bigd-col-md-2">
                  <h3>Featured</h3>
                  <ul class="bigd-list-unstyled">
                    <li>
                      <a
                        href="https://bigd.big.ac.cn/databasecommons"
                        target="_blank"
                        >Database Commons</a
                      >
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/ewas" target="_blank"
                        >EWAS Atlas</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://bigd.big.ac.cn/gsa"
                        target="_blank"
                        title="Genome Sequence Archive"
                        >GSA</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://bigd.big.ac.cn/gvm"
                        target="_blank"
                        title="Genome Variation Map"
                        >GVM</a
                      >
                    </li>
                    <li>
                      <a
                        href="http://ic4r.org"
                        target="_blank"
                        title="Information Commons for Rice"
                        >IC4R</a
                      >
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/idog" target="_blank"
                        >iDog</a
                      >
                    </li>
                    <li>
                      <a
                        href="https://bigd.big.ac.cn/methbank"
                        target="_blank"
                        title="Methylation DataBank"
                        >MethBank</a
                      >
                    </li>
                  </ul>
                </div>

                <div class="bigd-col-md-2">
                  <h3>Conferences & Education</h3>
                  <ul class="bigd-list-unstyled">
                    <li>
                      <a href="https://bigd.big.ac.cn/conference">Conferences</a>
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/education">Education</a>
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/training">Training</a>
                    </li>
                  </ul>
                </div>

                <div class="bigd-col-md-2">
                  <h3>Alliance & Collaboration</h3>
                  <ul class="bigd-list-unstyled">
                    <li>
                      <a href="https://bigd.big.ac.cn/bhbd-alliance">BHBD</a>
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/partners">Partners</a>
                    </li>
                    <li>
                      <a href="https://bigd.big.ac.cn/collaborations"
                        >Collaborations</a
                      >
                    </li>
                    <li><a href="https://bigd.big.ac.cn/funding">Funding</a></li>
                    <li>
                      <a href="https://bigd.big.ac.cn/contact">Contact Us</a>
                    </li>
                  </ul>
                </div>
              </div>

              <hr class="footer-hr" />
              <div class="bigd-row">
                <div class="bigd-col-md-7">
                  <p class="bigd-text-muted">
                    &copy; year National Genomics Data Center,
                    <span
                      ><a href="http://english.big.cas.cn" target="_blank"
                        >China National Center for Bioinformation / Beijing
                        Institute of Genomics</a
                      ></span
                    >,
                    <span
                      ><a href="http://english.cas.cn" target="_blank"
                        >Chinese Academy of Sciences</a
                      ></span
                    ><br />
                    No.1 Beichen West Road, Chaoyang District, Beijing 100101,
                    China<br />
                    <span
                      ><a href="bigd_sitepolicies"
                        >Policies and Disclaimers</a
                      ></span
                    >
                  </p>
                  <p class="bigd-text-muted">
                    <span
                      ><a
                        rel="license"
                        target="_blank"
                        href="http://creativecommons.org/licenses/by/3.0/cn/"
                      >
                        <img
                          alt="Creative Commons License"
                          style="border-width:0;height: calc((15/1920) * 100vw)"
                          src="https://bigd.big.ac.cn/static/image/cc.png"/></a
                    ></span>
                    This work is licensed under a
                    <span
                      ><a
                        rel="license"
                        href="http://creativecommons.org/licenses/by/3.0/cn/"
                        target="_blank"
                        >Creative Commons Attribution 3.0 China Mainland
                        License</a
                      ><br /><a
                        href="http://www.beian.miit.gov.cn"
                        target="_blank"
                        >京ICP备10050270号</a
                      ></span
                    >
                  </p>
                </div>
                <div class="bigd-col-md-5">
                  <div class="pull-right">
                    <ul class="bigd-list-inline">
                      <li>
                        <a href="http://english.big.cas.cn" target="_blank"
                          ><img
                            src="https://bigd.big.ac.cn/static/image/big_logo.png"
                            style="width: calc((32/1920) * 100vw)"
                        /></a>
                      </li>
                      <li>
                        <a href="http://www.picb.ac.cn/picb" target="_blank"
                          ><img
                            src="https://bigd.big.ac.cn/static/image/picb.png"
                            style="height: calc((32/1920) * 100vw);"
                        /></a>
                      </li>
                      <li>
                        <a href="http://english.ibp.cas.cn/" target="_blank"
                          ><img
                            src="https://bigd.big.ac.cn/static/image/ibp.png"
                            style="height: calc((32/1920) * 100vw);"
                        /></a>
                      </li>
                      <li>
                        <a href="http://english.cas.cn/" target="_blank"
                          ><img
                            src="https://bigd.big.ac.cn/static/image/cas.png"
                            style="height: calc((32/1920) * 100vw);"
                        /></a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </body>

    <Content class="my_content" v-if="ifshow_content">
            <header-bar></header-bar>

            <Content>
             
                <div>
                  <router-view />
                  <Back-top></Back-top>
                </div>
            
            </Content>
    </Content>

  </div>
</template>
<script>
import routers from '@/router/routers'
import { mapMutations } from 'vuex'
import HeaderBar from './components/header-bar'
import Header from './components/Header'


// import {prependHeaderSection,appendFooterSection} from '@/libs/headerfooter.js'

export default {
  name: 'App',
  components: {
    HeaderBar,

    Header,
   
  },
  // props:{
       
  //       ifshow_bread:Boolean,
  //       ifshow_content:Boolean,
      
  // },
  data() {
    return {
      values: [
        { id: 1, name: 'Home', link: '/', type: 'ios-home' },
        { id: 0, name: 'Search', link: '/Search', type: 'ios-search' },
        {
          id: 2,
          name: 'Erythroid Atlas',
          link: '/Erythroid_Atlas',
          type: 'ios-analytics',
        },
        { id: 3, name: 'Help', link: '/help', type: 'ios-paper' },
        { id: 4, name: 'About', link: '/about', type: 'ios-navigate' },
      ],
      current_index: -1,
      ifshow_bread: true,
      ifshow_content: false,

    }
  },
  computed: {
    local() {
      return this.$store.state.app.local
    },

    
    
  },

  // 当前位置的item
  methods: {
    ...mapMutations(['setLocal', 'setBreadCrumb', 'setHomeRoute','setNewRouteName']),

    getCurentStyle(newRouteName){
      if(newRouteName == 'main_sub'  ){
        // alert('yes')
        this.ifshow_bread = false
        this.ifshow_content = true
      }else{
        this.ifshow_bread = true
        this.ifshow_content =  false
    }
    },
    cg_current_index(index) {
      this.current_index = index
    },
    openWindow(url) {
      window.open(url)
    },
  },

  watch: {
    $route(newRoute) {
      // alert(newRoute.name)

      //  当为 search 页面时， 不需要 bread 的body 样式
      this.setNewRouteName(newRoute.name)

      if(newRoute.name == 'main_sub'  ){
        // alert('yes')
        this.ifshow_bread = false
        this.ifshow_content = true
      }else{
        this.ifshow_bread = true
        this.ifshow_content =  false
      }
      this.setBreadCrumb(newRoute)
    },

  },
  mounted() {
    // 设置初始语言
    // en-US
    // alert(this.$i18n.locale)

    // this.setLocal(this.$i18n.locale)
    this.setLocal('en-US')
    /**
     * @description 初始化设置面包屑导航和标签导航
     */

    this.setHomeRoute(routers)
    const { name, params, query, meta } = this.$route

    this.setBreadCrumb(this.$route)

    // 根据保存的newRouteName 判断条件样式
    this.getCurentStyle(this.$store.state.app.NewRouteName)


    // $(document).ready(function() {
    //   // prependHeaderSection();
    //   // appendFooterSection();

    //   $('li.bigd-dropdown').hover(
    //     function() {
    //       $(this)
    //         .find('.bigd-dropdown-menu')
    //         .first()
    //         .stop(true, true)
    //         .delay(50)
    //         .fadeIn()
    //     },
    //     function() {
    //       $(this)
    //         .find('.bigd-dropdown-menu')
    //         .first()
    //         .stop(true, true)
    //         .delay(50)
    //         .fadeOut()
    //     }
    //   )

    //   $('.bigd-collapsed').click(function() {
    //     $('#bigd-coll').toggle()
    //     var display = $('#bigd-coll').css('display')
    //     if (display == 'block') {
    //       $('.bigd-navbar').css('height', '200px')
    //     } else {
    //       $('.bigd-navbar').css('height', '30px')
    //     }
    //   })
    // })

  },
}
</script>

<style lang="less">
@import '../../css/page.min.css';

html,
body {
  height: 100%;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  color: #781111;
}
* {
  padding: 0;
  margin: 0;
}
//  calc((90/1920) * 100vw)
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: calc((1 / 1920) * 100vw);
  display: flex;
  flex-direction: column;
  flex: auto;
  background: #f5f7f9;
  margin-top: 35px;
  // overflow: hidden;
  // word-wrap:break-word;
  // word-break:break-all;
}
.layout-logo{
    color: #870909;
    width: 900px;
    min-width: 300px;
    height: 50px;
    /* background: #5b6270; */
    font-size: calc((35 / 1920) * 100vw);
    border-radius: 3px;
    /* text-align: center; */
    /* float: right; */
    /* position: relative; */
    top: calc((5 / 1920) * 100vw);
    /* padding-right: 110px; */
    font-size: 30px;
  }
.layout-nav {
  display: block;
  color: white;
  // width: calc((900/1920) * 100vw);
  margin: 0 auto;
  margin-right: calc((10 / 1920) * 100vw);
  // word-wrap:break-word;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  align-content: center;
  text-align: right;
  font-size:calc((30/1920) * 100vw);
}
.layout-footer-center {
  text-align: center;
}

.header {
  background: #515a6e;
  // padding: 0 calc((20/1920) * 100vw);
  height: calc((64 / 1920) * 100vw);
  line-height: calc((64 / 1920) * 100vw);
}

.menu-dark {
  background: #515a6e;
}

.menu-horizontal {
  height: calc((60 / 1920) * 100vw);
  line-height: calc((60 / 1920) * 100vw);
  font-size:20px;
}

.menu {
  display: inline-block;
  margin: 0 auto;
  padding: 0;
  outline: 0;
  list-style: none;
  color: #515a6e;
  font-size: calc((80 / 1920) * 100vw);
  position: relative;
  z-index: 900;
  margin: 0 auto;
}

.menu-item {
  // display: block;
  outline: 0;
  list-style: none;
  font-size: 20px;
  position: relative;
  z-index: 1;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: whitesmoke;
}

.menu-dark.menu-horizontal .menu-item-active,
.menu-dark.menu-horizontal .menu-item:hover,
.menu-dark.menu-horizontal .menu-submenu-active,
.menu-dark.menu-horizontal .imenu-submenu:hover {
  color: #fff;
}

.menu-horizontal .menu-item,
.menu-horizontal .menu-submenu {
  float: left;
  padding: 0 20px;
  position: relative;
  cursor: pointer;
  z-index: 3;
  transition: all 0.2s ease-in-out;
}

.icon {
  display: inline-block;
  font-family: Ionicons;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  vertical-align: middle;
}

.menu-item > i {
  margin-right: calc((6 / 1920) * 100vw);
}

.bg_color {
  // background-color: #FFE69F;
  color: white;
  font-weight: bolder;
}

.my_footer {
  font-size: calc((20 / 1920) * 100vw);
}

.my_content {
  // padding: 0 calc((30/1920) * 100vw);
  margin: 0 auto;
  // width: calc((1500/1920) * 100vw);  // 使居中
  width: 100%;
}
.my_icon {
  margin-right: calc((8 / 1920) * 100vw);
  font-size: calc((30 / 1920) * 100vw);
}

.bigd-container {
  margin-right: auto;
  margin-left: auto;
}

.headerStyle {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
}
.bodyStyle {
  margin-top: 110px;
}

.bigd-navbar-default {
    background-color: #8c0c0b;
    margin-bottom: 0;
}



</style>
