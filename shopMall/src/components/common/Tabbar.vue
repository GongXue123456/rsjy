<template>

   <van-tabbar class="tabbar" v-model="active" active-color="#45B7FF" inactive-color="#3C3C3C" v-if="$route.path == '/pages/home' || $route.path == '/pages/classify' || $route.path == '/pages/shoplist' || $route.path == '/pages/cart' || $route.path == '/pages/my'">
 <van-tabbar-item :to="{name:'HomeView'}"><span>首页</span><span slot="icon" slot-scope="props" class="iconfont" :class="+props.active ? icon.active : icon.normal" ></span></van-tabbar-item>
  <van-tabbar-item :to="{name:'ClassifyView'}"><span>分类</span><span slot="icon" slot-scope="props" class="iconfont" :class="+props.active ? icon1.active : icon1.normal" ></span></van-tabbar-item>
  <van-tabbar-item :to="{name:'ShopListView'}"><span>常购清单</span><span slot="icon" slot-scope="props" class="iconfont" :class="+props.active ? icon2.active : icon2.normal" ></span></van-tabbar-item>
  <van-tabbar-item :to="{name:'CartView'}"><span>购物车</span><span slot="icon" slot-scope="props" class="iconfont" :class="+props.active ? icon3.active : icon3.normal" ></span></van-tabbar-item>
     <van-tabbar-item :to="{name:'MyView'}"><span>我的</span><span slot="icon" slot-scope="props" class="iconfont" :class="+props.active ? icon4.active : icon4.normal" ></span></van-tabbar-item>
</van-tabbar>

 <!-- <van-tabbar v-model="active" active-color="#07c160" :fixed="true" v-if="$route.path == '/pages/home' || $route.path == '/pages/classify' || $route.path == '/pages/cart' || $route.path == '/pages/my'">
          <van-tabbar-item icon="bag" :to="{name:'HomeView'}">首页</van-tabbar-item>
          <van-tabbar-item icon="hot" :to="{name:'ClassifyView'}">活动</van-tabbar-item>
          <van-tabbar-item icon="shopping-cart" :to="{name:'CartView'}">购物车</van-tabbar-item>
          <van-tabbar-item icon="manager" :to="{name:'MyView'}">我的</van-tabbar-item>
      </van-tabbar> -->


</template>
<script>

export default {
    data() {
    return {
         icon: {
        normal: 'iconhome_icn',
        active: 'iconhome_icp'
      },
       icon1: {
        normal: 'iconclassify_icn',
        active: 'iconclassify_icp'
      },
       icon2: {
        normal: 'iconOftenbuy_icn',
        active: 'iconOftenbuy_icp'
      },
       icon3: {
        normal: 'iconshoppingtrolley_icn',
        active: 'iconshoppingtrolley_icp'
      },
       icon4: {
        normal: 'iconmine_icn',
        active: 'iconmine_icp'
      },
    }
  },
   computed:{
        // 这里也可以用计算属性控制active的值
        active:{
          get(){
              if (this.$route.path == '/pages/home'){
                  return 0
              } else if (this.$route.path == '/pages/classify') {
                  return 1
              } else if (this.$route.path == '/pages/shoplist') {
                  return 2
              } else if (this.$route.path == '/pages/cart') {
                  return 3
              } else if (this.$route.path == '/pages/my') {
                  return 4
              }
          },
          set(){}
        }
    },
}
</script>
<style lang="scss" scoped>
.iconfont:before{
    font-size: 24px;
}
</style>

