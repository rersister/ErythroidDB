<template>
	 <header>
      <div class="bigd-container headerStyle">
        <nav class="bigd-navbar-default bigd-navbar">
          <div class="bigd-navbar-header">
            <button type="button" class="bigd-navbar-toggle bigd-collapsed">
              <span class="bigd-sr-only">Toggle navigation</span>
              <span class="bigd-icon-bar"></span>
              <span class="bigd-icon-bar"></span>
              <span class="bigd-icon-bar"></span>
            </button>
            <a href="https://bigd.big.ac.cn/" class="bigd-navbar-brand"
              ><img
                src="https://bigd.big.ac.cn/cdn/image/CNCB-NGDC-white.png"
                class="bigd-img-responsive"
            /></a>
          </div>
          <div class="bigd-collapse bigd-navbar-collapse" id="bigd-coll">
            <ul class="bigd-nav bigd-navbar-nav bigd-navbar-right">
              <li @click="openWindow('https://bigd.big.ac.cn/databases')">
                <a href="javascript:void(0)"> Databases</a>
              </li>
              <li @click="openWindow('https://bigd.big.ac.cn/tools')">
                <a href="javascript:void(0)">Tools</a>
              </li>
              <li @click="openWindow('https://bigd.big.ac.cn/standards')">
                <a href="javascript:void(0)">Standards</a>
              </li>
              <li @click="openWindow('https://bigd.big.ac.cn/publications')">
                <a href="javascript:void(0)">Publications</a>
              </li>
              <li @click="openWindow('https://bigd.big.ac.cn/about')">
                <a href="javascript:void(0)">About</a>
              </li>
            </ul>
          </div>
        </nav>
        <div class="header">
          <div class="layout-logo">
            <img class="moudle_image_header " src="@/assets/img/development.png">
            <span>EryDB v1.00: Erythroid Database</span>
          </div>
          <div class="layout-nav">
            <ul
              class=" menu  menu-dark menu-horizontal"
              v-for="(value, index) in values"
              :key="index"
            >
              <router-link :to="value.link">
                <li
                  class="menu-item"
                  @click="cg_current_index(index)"
                  :class="{ bg_color: current_index == index }"
                >
                  <i class="icon icon-ios-navigate"></i>
                  <Icon class="my_icon" :type="value.type"></Icon
                  >{{ value.name }}
                </li>
              </router-link>
            </ul>
          </div>
        
        </div>
      </div>
    </header>
</template>

<script>

export default{
	name:'Header',
	data() {
    return {
      values: [
        { id: 1, name: 'Home', link: '/', type: 'ios-home' },
        { id: 0, name: 'Search', link: '/Search', type: 'ios-search' },
        {
          id: 2,
          name: 'Erythroid Atlas',
          link: '/Erythroid Atlas',
          type: 'ios-analytics',
        },
        { id: 3, name: 'Help', link: '/help', type: 'ios-paper' },
        { id: 4, name: 'About', link: '/about', type: 'ios-navigate' },
      ],
      current_index: -1,
    }
  },
  methods: {
    
    cg_current_index(index) {
      this.current_index = index
    },
    openWindow(url) {
      window.open(url)
    },
  },

}

</script>

<style scoped>
  .header, .menu-dark {
    background: white;
  }


  .header {
    height: 105px;
    /* line-height: calc((150 / 1920) * 100vw); */
    border-color: #a85557!important;
    border-bottom-style: solid
  }

  .menu-horizontal {
    height: calc((60 / 1920) * 100vw);
    line-height: calc((60 / 1920) * 100vw);
    font-size:20px;
  }

  .layout-logo{
    color: #870909;
    width: 1000px;
    min-width: 500px;
    height: 60px;
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
    margin: 0 auto;
    /* margin-right: calc((10 / 1920) * 100vw); */
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    -ms-flex-line-pack: center;
    align-content: center;
    /* text-align: right; */
    font-size: calc((20/1920) * 100vw);
    height: 40px;
    /* line-height: 90px; */
    min-width: 580px;
    /* position: absolute; */
    left: 0;
    bottom: 3px;
  }
  .menu-item {
      outline: 0;
      list-style: none;
      font-size: 16px;
      position: relative;
      z-index: 1;
      cursor: pointer;
      -webkit-transition: all 0.2s ease-in-out;
      transition: all 0.2s ease-in-out;
      color: #870909
      /* height: 60px; */
  }

  .menu-dark:hover{
        background:  #8c0c0b;
        /* color: #8c0c0b; */
        /* border-color: #ea898c !important; */
  }

  .moudle_image_header{
    block: true;
    /* float: left; */
    margin-bottom: 2%;
    width: calc((300/1920) * 100vw);
    height: calc((90/1920) * 100vw);
    line-height: calc((90/1920) * 100vw);
    margin-right: 15px;
  }
</style>