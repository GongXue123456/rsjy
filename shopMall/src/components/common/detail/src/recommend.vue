<template>
      <div  v-if="mold === 'aaa'" class="recommend bgcfff lists1">
          <div  class="bgcfff list borr10" v-for="(item,index) in items" :key="index">
            <div class="pr pb10" @click="$router.push('/introducemenu?co_id='+item.co_id)">

              <van-image
  width="86px"
  height="86px"
  fit="cover"
 radius="10px"
  :src="item.co_logo_thumb"
/>
            </div>
            <div class="tc c28">{{item.co_name}}</div>
          </div>
        </div>
         <div  v-else-if="mold === 'bbb'" class="recommend bgcfff lists1">
          <div  class="bgcfff list borr10" v-for="(item,index) in items" :key="index">
            <div class="pr pb10" @click="toDetail(item.p_id,item.ps_id)" :data-id="item.p_id" :data-num="item.ps_id">

              <van-image
  width="86px"
  height="86px"
  fit="cover"
  radius="10px"
  :src="item.img_thumb"
/>
            </div>
            <div class="tc c28">{{item.ps_main_title}}</div>
          </div>
        </div>
</template>
<script>
import {local} from '../../../../until/data'
export default {
    name:'recommend',
    props: {
      items: {
        type: Array,
        required: true
      },
       mold: {
      type: String,
      required: true
    }
    },
    methods:{
      toDetail(id,psid){
         local.set("searchval", '')
        this.$router.replace({
           name: "DetailView",
        query: {
          id: id,
           psid:psid
        }
        })
        
        this.$parent.fatherMethod();
      }
    }
}
</script>
<style lang="scss" scoped>
.lists1 {
  overflow: hidden;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-user-select: none;
  user-select: none;
  box-sizing: content-box;
  padding-bottom: 0.75rem;
  width: 344px;
  margin: auto;
  .list {
    position: relative;
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
    box-sizing: border-box;
    min-width: 0;
    color: #7d7e80;
    font-size: 14px;
    cursor: pointer;
    -webkit-box-flex: 0;
    -webkit-flex: 0 0 25%;
    flex: 0 0 25%;
    margin-right: 10px;
  }
  /deep/ .van-image img{border-radius: 10px;}
}
</style>

