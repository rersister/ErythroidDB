<template>
  <error-content code="500" desc="Oh~~The server is under maintenance and upgrade~" :src="src"/>
</template>

<script>
import error404 from '@/assets/img/error-page/error-500.svg'
import errorContent from './error-content.vue'
export default {
  name: 'error_500',
  components: {
    errorContent
  },
  data () {
    return {
      src: error404
    }
  }
}
</script>
