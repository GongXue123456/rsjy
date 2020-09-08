<template>
  <div class="introduceMenu">
     <NavBar type="detail"></NavBar>
    <swiper :images="images"></swiper>
    <simple  v-on:myevnet="collection(params.is_collect)" :s-title="params.co_name" :s-colect='isCollect' :s-desc='params.co_desc' ></simple>
    <div class="introduceMenu-contrain mb50">
      
      <div class="introduceMenu-contrain-list">
        <div class="introduceMenu-contrain-list-h">食材清单/共{{specListLen}}件</div>
          <van-list>
            <van-cell class="borr10">
              <van-row type="flex" align="center" v-for="(item, k) in specList" :key="k">
                <van-col span="2" >
                  <van-checkbox
                    v-model="item.ischcked"
                    checked-color="#45B7FF"
                    name="addcart"
                  ></van-checkbox>
                </van-col>
                  <van-col span="22">
                    <van-card class="tl pt10 pb10 pl5 pr0 bgcfff" :title="item.ps_main_title" :thumb="item.img_thumb"  @click.stop="go_detail(item.p_id,item.ps_id)"
              :data-id="item.p_id"
              :data-num="item.ps_id">
                      <div slot="tags" class="mb10">
                         {{item.ps_attr}}
                        <!-- <van-tag plain type="danger" class="general_border general_color">找相似</van-tag> -->
                      </div>

                      <div slot="tags" class="c91">
                        市场参考价&nbsp;&nbsp;
                        <span class="f16 general_color">¥&nbsp;{{item.ps_price_sell.toFixed(2)}}/{{item.ps_unit}}</span>
                        <van-tag @click="intoCartSinge(item.ps_id)" plain class="fr addCar general_bgc tc iconfont f20 icon-gouwuche cfff" ></van-tag>
                      </div>
                    </van-card>
                  </van-col>
              </van-row>
            </van-cell>
          </van-list>
      </div>

    </div>
    <div class="introduceMenu-tab">
      <div>
        <van-checkbox class="f15"  @change="allselect" v-model="ischecked" checked-color="#45B7FF">全选</van-checkbox>
      </div>
      <div>
        <van-button @click="intoCart" type="default" class="general_bgc cfff">加入购物车</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import swiper from '../components/common/IntroduceMenu/Swipe'
import simple from '../components/common/IntroduceMenu/SimpleIntroduce'
import NavBar from "../components/common/NavBar";
import { getlistByBillSKU, getCartAddweb, getDishesDetail, oncollect, cancelCollectDelete,getCartQuery } from '../api'
import {local} from '@/until/data';
export default {
  components: {
    swiper,
    simple,
    NavBar
  },
  data () {
    return {
      params: {},
      images: [],
      co_id: '',
      specList: [],
      specListLen: 0,
      ischecked: false,
      isCollect:0,
       user:local.get('userinfo'),
       collect:''
    }
  },
  created () {
    if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
   this.getData()
  },
  methods: {
    /**
     * 获得sku数据
     */
    getData(){
       let self = this
    this.co_id = this.$route.query.co_id;
    getDishesDetail({co_id: this.co_id, customer_id: this.user.c_id}).then(v => {
       self.images.push(v.data.co_logo)
       self.params = v.data
       self.init(self.co_id)
       self.isCollect=v.data.is_collect;
    })
    },
    init (id) {
      let self = this
      getlistByBillSKU({id: id}).then(v => {
          self.specList = v.data
          self.specListLen = v.data.length
      })
    },
    /**
     * 点击收藏是否取消
     */
    collection (params) {
      let collect = params
        console.log(collect)
      let data = {
        co_id: this.co_id,
        c_id: this.user.c_id
      }
      if (collect==1) {
         this.isCollect=0
        params = 0
        //  cancelCollectDelete(data)
       
        //  this.getDishesDetail()
        cancelCollectDelete(data).then(response=>{
             if (response.code == 200) {
               this.$toast("取消收藏成功")
              //  this.collect=0
                this.getData()
             }
          })
      } else {
         this.isCollect=1
         params = 1
          // oncollect(data)
          //  this.getDishesDetail()
        oncollect(data).then(response=>{
             if (response.code == 210) {
               this.$toast("收藏成功")
                // this.collect=1
                 this.getData()
             }
          })
      }
    },
    /**
     * 收藏
     */
    // collect (v) {
    //   if(v===1) {
    //     this.shoucang = true
    //   } else {
    //     this.shoucang = false
    //   }
    // },
    /**
     * 全选
     */
    allselect (v) {
      if(v){
        this.specList.forEach(v => {
          v.ischcked = true
        })
      } else {
        this.specList.forEach(v => {
          v.ischcked = false
        })
      }
    },
    /**
     * 添加单个进购物车
     */
    intoCartSinge (id) {
      let list = []
      list.push(id)
      this.addCart(list)
    },
    /**
     * 添加进购物车
     */
    intoCart () {
      let list = []
      this.specList.forEach(v => {
        if (v.ischcked){
          list.push(v.ps_id)
        }
      })
      if (list.length === 0) {
        this.$notify("必须选择一个")
        return
      }
      // getCartAddweb({list, "c_id":local.get('userinfo').c_id})
      this.addCart(list)
    },
    addCart(list){
      getCartAddweb({list, "c_id":this.user.c_id}).then(response => {
            if (response.code == 210) {
              this.$toast("加入购物车成功");
              let data1 = {
                c_id:this.user.c_id
              };
              getCartQuery(data1).then(response => {
                if (response.code == 200) {
                  var cartlist = response.data;
                  this.$store.dispatch("cart/addGoods", cartlist);
                }
              });
            } else {
              this.$toast({
                message: response.msg,
                duration: 5000
              });
            }
          });
    },
     go_detail(id,psid) {
      this.$router.push({
        name: "DetailView",
        query: {
          id: id,
          psid:psid
        }
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.introduceMenu{
  .introduceMenu-contrain{
    padding: 0 2.5%;
        margin-top: 90px;
       margin-bottom: 70px;
       border-radius: 10px;
    .introduceMenu-contrain-list{
       background: #fff;
        border-radius: 10px;
      .introduceMenu-contrain-list-h{
        padding-left: 0.75rem;
        font-size: 0.7rem;
        color:#919191;
        height: 2.5rem;
        line-height: 2.5rem;
      }
    }
  }
  .introduceMenu-tab{
    height: 51px;
    padding: 0 2.5%;
    background:#fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

   .van-button--default{
        border-radius: 25px;
  }
  
  .van-card {
  margin-top: 0px;
  .van-card__title {
        max-height: 40px;
    font-size: 17px;
    margin-bottom: 10px;
  }
  .van-tag {
    padding: 3px 8px;
    border-radius: 9px;
  }
  .addCar {
    width: 26px;
    height: 26px;
    line-height: 26px;
    border-radius: 50%;
    padding: 0px;
    color: #fff !important;
  }
}
}
</style>
