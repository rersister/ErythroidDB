<template>
  <!-- <div id="app">
    
    <Header></Header>
    <router-view/>
  </div> -->
  <div class="layout">
        <!-- <ul v-for="(value,index) in values" :key="index">
            <router-link to="/">
                <li class="menu-item" @click="cg_current_index(index)" :class="{'bg_color':current_index==index}">
                    {{value.name}}
                </li>
             </router-link>
        </ul> -->
         <!-- <Layout> -->
            <div class='header'>

               
                <!-- <Menu mode="horizontal" theme="dark" active-name="1">-->
                    <div class="layout-logo">ErythroidDB</div>                  
                    <div class="layout-nav"> 
                        <ul class=" menu  menu-dark menu-horizontal" v-for="(value,index) in values" :key="index">
                            
                            <router-link :to="value.link">
                                <!-- <MenuItem name="1">                        
                                   
                                    Home
                                </MenuItem> -->
                                
                                <li class="menu-item" @click="cg_current_index(index)" :class="{'bg_color':current_index==index}"><i class="icon icon-ios-navigate"></i>
                                <Icon class="my_icon" :type="value.type"></Icon>{{value.name}}
                                </li>
                            </router-link>
                         </ul>
                        <!-- <a href="/ErythroidDB/#/" class="router-link-active"><li class="ivu-menu-item ivu-menu-item-active ivu-menu-item-selected"><i class="ivu-icon ivu-icon-ios-navigate"></i> -->
                              <!-- Home
                        </li></a> -->
                        <!-- <router-link to="/ErythroidAtlas">
                            <MenuItem name="2">
                                <Icon type="ios-keypad"></Icon>
                                ErythroidAtlas
                            </MenuItem>
                         </router-link>
                        <router-link to="/help">
                            <MenuItem name="3">
                                <Icon type="ios-analytics"></Icon>
                                Help
                            </MenuItem>
                        </router-link> 
                        <router-link to="/about">   
                            <MenuItem name="4">
                                <Icon type="ios-paper"></Icon>
                                About
                            </MenuItem>
                        </router-link>                       -->
                        <!-- <language v-if="$config.useI18n" @on-lang-change="setLocal" :lang="local" style="color: white;"/>                                               -->
                    </div>
                                       
                <!-- </Menu> --> 
            </div>

            <Content class="my_content">
               
                     <!-- <BreadcrumbItem v-for="item in BreadcrumbItem" :to="item.to" :key="item.title" :list="breadCrumbList">                     
                        {{item.title}}
                    </BreadcrumbItem> -->
                    <!-- <custom-bread-crumb  style="margin-left: 30px;" :list="breadCrumbList"></custom-bread-crumb> -->
                    <header-bar></header-bar>


                    <Content>
                       <Card>                            
                            <div>                              
                                <router-view/>                              
                                <Back-top></Back-top>
                            </div>
                        </Card> 
                    </Content> 
                    <!-- <Content class="main-content-con" >
                        <Layout class="main-layout-con">
                             
                            <Content class="content-wrapper">
                                <keep-alive :include="cacheList">
                                    <router-view/>
                                </keep-alive>
                               
                                <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
                            </Content>
                        </Layout>
                    </Content>  -->
            </Content>

            <Footer class="layout-footer-center"><span class="my_footer"> Copyright ©2018-2019  Guangmin Zheng.&copy;<a href="http://sourcedb.big.cas.cn/zw/zjrc/yjy/201311/t20131116_3979427.html" target="_blank" title="北京基因组研究所方向东">Fang's Lab.</a> All Rights Reserved.</span></Footer>
        <!-- </Layout> -->
    </div>

</template>
<script>

import routers from '@/router/routers'
import { mapMutations } from 'vuex'
import HeaderBar from './components/header-bar'
import Language from './components/language'

export default {
    name: 'App',
    components: {

      HeaderBar,
      Language,  
      },
    data(){
        return{
            values:[
                {id:1,name:"Home",link:'/',type:'ios-home',},
                {id:2,name:"ErythroidAtlas",link:'/ErythroidAtlas',type:'ios-analytics'},
                {id:3,name:"Help",link:'/help',type:'ios-paper'},
                // <Icon type="ios-chatbubble-outline"></Icon>
// <Icon type="ios-home"></Icon>
                {id:4,name:"AboutUs",link:'/about',type:'ios-navigate'}],
                current_index:-1
          
        }

    },
    computed:{

        local () {
                return this.$store.state.app.local
        },

   
    },
   
    // 当前位置的item
    methods:{
       
       ...mapMutations([

           'setLocal',
           'setBreadCrumb',
           'setHomeRoute',

       ]),

       cg_current_index(index){

           this.current_index = index
       }


    },

    watch:{

        '$route' (newRoute) {   
            this.setBreadCrumb(newRoute)
    
        }
    },
    mounted () {

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


    
    }



  
  }
</script>

<style lang="less">


  html,body{
    height: 100%;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;


  }
  *{
    padding: 0;
    margin: 0;
  }
//  calc((90/1920) * 100vw)
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: calc((1/1920) * 100vw);
    display: flex;
    flex-direction: column;
    flex: auto;
    background: #f5f7f9;
   
    // overflow: hidden;
    // word-wrap:break-word; 
    // word-break:break-all; 
}
.layout-logo{
    color: white;
    width: calc((400/1920) * 100vw);
    height: calc((50/1920) * 100vw);
    /* background: #5b6270; */
    font-size: calc((40/1920) * 100vw);
    border-radius: 3px;
    float: left;
    position: relative;
    top:  calc((5/1920) * 100vw);
    left: calc((80/1920) * 100vw);
}
.layout-nav{
    display: block;
    color: white;
    width: calc((1200/1920) * 100vw);
    margin: 0 auto;
    margin-right: calc((30/1920) * 100vw);
    // word-wrap:break-word;
    word-wrap:break-word; 
    word-break:break-all; 
    overflow: hidden; 
    align-content: center;

}
.layout-footer-center{
    text-align: center;
   
}

.header{
    background: #515a6e;
    // padding: 0 calc((20/1920) * 100vw);
    height: calc((64/1920) * 100vw);
    line-height: calc((64/1920) * 100vw);
}

.menu-dark {
    background: #515a6e;
}

.menu-horizontal {
    height: calc((60/1920) * 100vw);
    line-height: calc((60/1920) * 100vw);
}

.menu {
    display: inline-block;
    margin: 0 auto;
    padding: 0;
    outline: 0;
    list-style: none;
    color: #515a6e;
    font-size: calc((80/1920) * 100vw);
    position: relative;
    z-index: 900;
    margin: 0 auto;

}

.menu-item {
    // display: block;
    outline: 0;
    list-style: none;
    font-size: calc((20/1920) * 100vw);
    position: relative;
    z-index: 1;
    cursor: pointer;
    transition: all .2s ease-in-out;
    color: whitesmoke;
    
}


.menu-dark.menu-horizontal .menu-item-active, .menu-dark.menu-horizontal .menu-item:hover, .menu-dark.menu-horizontal .menu-submenu-active, .menu-dark.menu-horizontal .imenu-submenu:hover {
    color: #fff;
}

.menu-horizontal .menu-item, .menu-horizontal .menu-submenu {
    float: left;
    padding: 0 20px;
    position: relative;
    cursor: pointer;
    z-index: 3;
    transition: all .2s ease-in-out;
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

.menu-item>i {
    margin-right: calc((6/1920) * 100vw);
}

// li {
//     width: 300px;
//     margin: 0 40%;
//     border: 1px solid darkgray;
//     cursor: pointer;
//     padding: 10px;
//     margin-top: 10px;
//   }

  .bg_color {
    // background-color: #FFE69F;
    color: white;
    font-weight: bolder;

  }

  .my_footer{
       font-size: calc((30/1920) * 100vw);
  }

  .my_content{
    padding: 0 calc((10/1920) * 100vw);
    width: calc((1900/1920) * 100vw);

  }
  .my_icon{
        margin-right: calc((8/1920) * 100vw);
        font-size: calc((30/1920) * 100vw);
    }
</style>
