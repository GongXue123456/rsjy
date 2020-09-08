<template>
  <div class="list">
   
    <div class="list-nav w">
        <Nav title="留样" />
        <div class="record  w">
    </div>
    </div>
    <div class="pt50 bgcfff">
       <div v-if="items.length">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"  >
               <div class="reviewed pr m15 p15 pt15 bgf5" v-for="(item,index) in items" :key="index" >
          <h3 class="c000 f16 fb">{{item.sample_name}}<span class="f16 ml30">{{item.sample_num}}g</span></h3>
           <span class="pa iconfont iconxiangyou"  @click="$router.push('/sampleList/detail?id='+item.sample_code)"></span>
           <div class="address  f15 mt15 view-text"><span class="fl general_color">留样时间：{{item.sample_time}}</span><span class="fr">留样人：{{item.sample_person}}</span></div>
          <van-button class="mt10" type="primary"  size="small" round  @click="$router.push('/sampleList/add?id='+item.sample_code+'&company_code='+params.company_code)"> 再次使用为新的留样</van-button>
          <van-button class="mt10 ml20" type="danger"  size="small" round  @click="onDelete(item.sample_code,index)"> 删除留样</van-button>
        </div>
      
             </van-list>
          </div>
            <empty v-else-if="!items.length&&finished==true" title="暂无留样信息" />
         <div class="footer p15 bgcfff w"> 
        <van-row gutter="20">
          <van-col span="24"><van-button  block type="primary" native-type="submit"  @click.stop="$router.push('/sampleList/add?company_code='+params.company_code)"> 新增留样 </van-button></van-col>
         
        </van-row>
       </div>
          
    </div>

  </div>
</template>
<script>
import Nav from "../../../components/Nav";
import axios from "../../../axios/index.js";
import empty from "../../../components/empty";
export default {
  name: "my-order",
  components: {Nav,empty},
  data() {
    return {
      items:[],
       params: {
        pager_offset: 0,
        pager_openset: 10,
        company_code:'',
      },
      loading: false,
      finished: false,
    };
  },
  created(){
    this.params.company_code=this.$route.query.id;
    this.onLoad()
  },

  methods: {
    getData() {
       axios.get("app/foodsample/list", this.params).then(v => {
        if (v.code == 200) {
            this.items = this.items.concat(v.data.pager_list);
            this.loading = false;
              if (v.data.pager_list.length < 10) {
                this.finished = true;
              }
            this.params.pager_offset = this.params.pager_offset + 10;
        } else {
          this.$toast({
            message: v.msg,
            duration: 5000
          });
        }
      });
    },
     add(){
      this.$router.push({
        path:'/sampleList/add',
        query:{
          company_code:this.params.company_code,
          id:this.$route.query.id
        }
      })
    },
     onLoad(){
             setTimeout(() => {
                   this.getData()
            }, 500);
          },
    onDelete(code,index){
      this.$dialog.confirm({message: '确认删除？',}).then(() => {
         axios.delete('app/foodsample/delete', {sample_code:code}).then(() => {
         this.items.splice(index, 1)
      })
     }).catch(() => {});
      
      
    },
  }
};
</script>
<style lang="less" scoped>
.list {
        height: 100vh;
  .list-nav{position: fixed;left: 0px;top: 0px;z-index: 100;
  .record{padding-top: 54px;
   img {
    width: 25px;
    height: 25px;
    position: absolute;
    top: 69px;
    left: 20px;
    z-index: 100;
  }}}

  .reviewed {
    border-radius:5px;
    .address {
      color: #A6A6A6;
      width: 95%;
    }
    .iconfont {
      color: #A6A6A6;
      top: 45px;
      right: 10px;
    }
  }
.footer{
  position: fixed;bottom: 0px;left: 0px;
  .van-button__text{
    font-size: 18px;
  }
}
}
</style>