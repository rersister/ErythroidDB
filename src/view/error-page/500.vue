<template>
  <error-content code="500" desc="Oh~~服务器正在维护升级中~" :src="src"/>
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
