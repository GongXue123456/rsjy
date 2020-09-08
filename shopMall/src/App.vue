<template>
  <div id="app">
     <router-view class="view" v-if="isRouterAlive"></router-view>
    <!-- <router-view class="view"></router-view> -->
    <router-view class="view" name="subject"></router-view>
    <router-view class="view" name="search"></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'app',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  box-sizing: border-box;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  background-color: #F5F5F5; */
}
h2 {
  margin: 0;
  font-weight: Bold;
  color: #282828;
  padding: 15px !important;
}
.bgc-h100{
  background-color: #fff;
  height: 100vh;
}
.search-tab{
    padding:0px 15px 0px 15px;
 div{
     float: left;
     padding: 8px 17px;
     font-size: 17px;
     background-color: #F5F5F5;
border-radius: 4px;
 }
div.active{
    background-color: #45B7FF;
    color: #fff;
}
}

</style>
