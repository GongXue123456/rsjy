<template>
  <div v-if="type === 'aaa'" class="head-search">
      <van-search  @focus="goToSearch"  placeholder="请输入搜索关键词" v-model="value" />
  </div>
  <div v-else-if="type === 'bbb'">
       <van-row class="bgcfff bbb" style="border-bottom: 1px solid #f5f5f5">
            <van-col span="3" >
                <div style="height:50px;line-height: 55px;text-align: center;font-size: 16px">
                    <div class="iconfont icon-arrowleft" @click="back"></div>
                </div>
            </van-col>
            <van-col span="21">
                <form action="/">
                <van-search class="search_all" @search="onSearch" placeholder="请输入搜索关键词" @clear='clear' show-action v-model="value">
                  <div slot="action" @click="onSearch">搜索</div>
                </van-search>
                </form>
            </van-col>
        </van-row>
  </div>
   <van-row  v-else-if="type === 'home'" class="search transparent pl10 pr10">
            <!-- <van-col span="3" >
                <div class="hear-left cfff tc f15" >
                   彭州
                </div>
            </van-col> -->
            <van-col span="24">
                 <van-search @focus="goToSearch"  class="transparent pl5 pr5" v-model="value" placeholder="请输入商品名称" >
                 </van-search>
            </van-col>
            <!-- 消息入口
            <van-col span="3" >
                <div class="hear-right cfff tc ">
                    <i class="iconfont icon-chat"></i>
                </div>
            </van-col> -->
        </van-row>
   <div  v-else-if="type === 'shoplist'" class="head-search shop-list">
     <van-row class="transparent" style="border-bottom: 1px solid #f5f5f5">
             <!-- <van-col span="3" >
                <div style="height:50px;line-height: 55px;text-align: center;font-size: 16px">
                    <div class="iconfont icon-arrowleft" @click="$router.back()"></div>
                </div>
            </van-col> -->
            <van-col span="21" class="pl10">
                  <form action="/">
                <van-search class="search_all transparent" @search="onSearch"  v-model="value" @clear='clear' show-action placeholder="请输入搜索关键词">
                  <div slot="action" @click="onSearch">搜索</div>
                </van-search>
                  </form>
            </van-col>
             <van-col span="3" >
                <div class="hear-right tc " @click="tocart">
                    <i class="iconfont iconshoppingtrolley_ic f18" ></i>
                </div>
            </van-col>
        </van-row>
  </div>
  <div v-else class="head-search shop-list">
     <van-row class="transparent" style="border-bottom: 1px solid #f5f5f5">
             <van-col span="3" >
                <div style="height:50px;line-height: 55px;text-align: center;font-size: 16px">
                    <div class="iconfont icon-arrowleft" @click="back"></div>
                </div>
            </van-col>
            <van-col span="18">
                  <form action="/">
                <van-search class="search_all" @search="onSearch"  v-model="value" @clear='clear' show-action placeholder="请输入搜索关键词">
                  <div slot="action" @click="onSearch">搜索</div>
                </van-search>
                  </form>
            </van-col>
             <van-col span="3" >
                <div class="hear-right tc " @click="tocart">
                    <i class="iconfont iconshoppingtrolley_ic f18" ></i>
                </div>
            </van-col>
        </van-row>
  </div>

</template>
<script>
import {local} from '../../until/data'
export default {
    name:'',
    props: ['type','name'],
    data(){
      return{
          value:this.name
      }
    },
     watch : {
            'name' : function(newVal, oldVal){
                this.value = newVal;
            },
            // value : function(newVal, oldVal){
            //     this.$emit("update:name", newVal);
            // }
        },
    created () {
    this.value = local.get('searchval')
  },
    methods:{
      onSearch(){
        this.$emit('myvalue', this.value)
        local.set("searchval", this.value)
      },
      goToSearch(){
        this.$router.push({
          path: '/search'
        })
      },
      back(){
         this.$router.back();
          local.set("searchval", '')
      },
      clear(){
         this.$emit('myvalue', '')
        local.set("searchval", '')
      },
      tocart(){
         this.$router.push('/pages/cart?id=1')
          local.set("searchval", '')
      }
    }
}
</script>

<style lang="scss" scoped>
.van-search__content{
    border-radius: 17px;
}
.search_all{
padding: 10px 16px 10px 0px;
}
.hear-right,.hear-left{height: 50px;line-height: 55px}
.search .van-search__content{
    background-color: #fff
}
.shop-list {
    .search_all{padding: 10px 0px 10px 0px;}
    /* .van-search__content{ background-color: #fff} */
.hear-right i{color: #B2B2B2}
}
.bbb .van-search__action{padding-right: 0px;}
</style>
