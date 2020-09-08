<template>

<div v-if="type === 'detail'">
      <transition  name="fade">
            <div class="nav">
                <van-row>
                    <van-col span="11" offset="1" >
                        <span class="iconfont icon-arrowleft"  @click="$router.back()">
                        </span>
                    </van-col>
                    <van-col span="11" class="tr">
                        <span class="iconfont iconshoppingtrolley_ic f18"  @click="toCart()">
                        </span>
                    </van-col>
                </van-row>
            </div>
        </transition>
  </div>
    <van-nav-bar v-else-if="common"  class="navbar"
  title="标题"
  left-text="返回"
  right-text="按钮"
  left-arrow
  @click-left="onClickLeft"
  @click-right="onClickRight"
/>
</template>

<script>
import {local} from '../../until/data'
import Vue from 'vue'
import {Toast} from 'vant';

Vue.use(Toast);
export default {
  name: 'head-bar',
   props: ['type'],
  data () {
    return {}
  },
 methods: {
    onClickLeft() {
      Toast('返回');
    },
    onClickRight() {
      Toast('按钮');
    },
    toCart(){
        this.$router.push('/pages/cart?id=1')
        // this.$router.push({name: 'CartView'})
        local.set("searchval", '')
    }
  }
}
</script>

<style lang="scss" scoped>
.head-bar {
  width: 18.75rem;
  height: 3.125rem;
  line-height: 3.125rem;
  text-align: center
}
  .nav {width: 100%;position: fixed;top: 0;z-index: 99;
    .van-col{
height: 46px;line-height: 46px;padding-top: 5px;
 span {height:30px;width: 30px;line-height: 30px;border-radius: 50%;color: white;
                        display: inline-block;font-size: 20px;background-color: rgba(0,0,0,0.5);
                        text-align: center}
    }
   }
</style>
