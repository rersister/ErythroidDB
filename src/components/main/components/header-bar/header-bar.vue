<template>
  <div >
    
    <custom-bread-crumb class="header-bar" show-icon  :list="breadCrumbList"></custom-bread-crumb>
    
  </div>
</template>
<script>

import customBreadCrumb from './custom-bread-crumb'

export default {
  name: 'HeaderBar',
  components: {
  
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  methods: {
   
  }
}
</script>

<style lang="less">

  .ivu-breadcrumb-item-link{
    font-size: 16px;
  }

</style>