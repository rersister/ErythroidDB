<template>
  <!-- main -->
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">



.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  // overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}

.ivu-btn-primary {
  background: #870909!important;
  color: #fff!important;
  border-color:#870909!important;
}

.ivu-input-search {
  background: #870909!important;
  color: #fff!important;
  border-color:#870909!important;

}
.ivu-input-search {
  background: #870909!important;
  color: #fff!important;
  border-color:#870909!important;

}
.ivu-input-search:hover{
      background: #e6b9b8 !important;
      color: #fff !important;
      border-color: #ea898c !important;
}


  .h1_title{
    
          font-size:25px;
    }
    
  .h2_title{
    font-size:20px;
  }

  .h3_title{
    font-size:20px;
  }

  .h4_title{
    font-size:16px;
  }
  

  .my_h1{
      font-size:25px;
      text-align: center;
  }

.ivu-table-wrapper {
    position: relative;
    border: 1px solid #dcdee2;
    border-bottom: 0;
    border-right: 0;
    /* overflow: hidden; */
}

  .my_reset_button{
    background: #8c0c0b !important;
    color: #fff !important;
    border-color: #ea898c !important;
  }

  .ivu-table tr:hover{
    cursor:pointer;
  }

</style>

