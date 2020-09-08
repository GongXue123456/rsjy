<template>
  <div class="pages-view">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<script>
import Tabbar  from '../components/common/Tabbar'
  export default {
    name: 'pages-view',
    components: {
      Tabbar,
    },
    data () {
      return {
        
      }
    },
    methods: {
    }
  }

</script>
<style lang="scss" scoped>
</style>
