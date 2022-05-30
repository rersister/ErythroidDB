<template>
  <error-content code="401" desc="Oh~~You do not have permission to browse this page~" :src="src"/>
</template>

<script>
import error401 from '@/assets/img/error-page/error-401.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error_401',
  components: {
    errorContent
  },
  data () {
    return {
      src: error401
    }
  }
}
</script>
