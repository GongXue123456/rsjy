<template>
    <div class="oeder-menu bgc-h100">
      <HeadSearch type="ccc" v-on:myvalue="getvalue"></HeadSearch>

      <van-tabs :line-width="70" swipeable title-active-color="#45B7FF" :sticky="true" @click="Handlebill">
         <!-- <van-tab title="全部" name="a"></van-tab> -->
        <van-tab v-for="(item, key) in bill_name" :title="item.bill_name" :name="item.bill_id"  :key="key"></van-tab>
       
      </van-tabs>

      <van-tabs
        type="card"
        class="sec_tabs mt15 van-tabs1"
        :line-width="70"
        swipeable
        title-active-color="#fff"
        @click="HandlebillCombo"
        :ellipsis="false"
        >
         <van-tab  name=""><div class="tab-title" slot="title" >全部</div></van-tab>
        <van-tab v-for="(item, key) in bill_attr"  :key="key" :name="item.v_id">
           <div
                  class="tab-title"
                  slot="title"
                >{{item.v_name}}</div>
        </van-tab>
        
      </van-tabs>

      <!-- <van-tabs
        v-show="isTrue"
        type="card"
        class="sec_tabs mt15"
        :line-width="70"
        swipeable
        title-active-color="#D52E3B"
        @click="allHandlebillCombo"
        >
          <van-tab title="全部" name=""></van-tab>
        <van-tab v-for="(item, key) in all_attr" :title="item.v_name"  :key="key" :name="item.v_id"></van-tab>
      </van-tabs> -->


        <div style="position: absolute;top: 160px;bottom: 0;width: 100%;overflow-y: scroll;">
          <!-- <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediateCheck = false
          > -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
           <div  v-for="(item, key) in list" :key="key">
              <van-row>
            <van-col span="24">
              <van-card
             
              class="tl bgcfff"
              :desc="item.co_desc"
              :title="item.co_name"
              :thumb="item.co_logo_thumb"
              @click="intoDetail(item.co_id)"
            >
            <div slot="tags" class="c91" @click.stop>
              <van-tag @click="handleTag($event,item.co_id)" plain class="fr addCar general_bgc tc iconfont f20 icon-gouwuche cfff" >
              </van-tag>
            </div>
          </van-card>
           </van-col>
           </van-row>
           
           </div>
          </van-list>
        </div>



      <van-popup v-model="show" position="bottom" :style="{ height: '70%' }">
        <div class="introduceMenu-contrain">
          <div class="introduceMenu-contrain-list">
            <div class="introduceMenu-contrain-list-h">食材清单/共{{specListLen}}件</div>
            <van-list>
              <van-cell>
                <van-row type="flex" align="center" v-for="(item, k) in specList" :key="k">
                  <van-col span="3" >
                    <van-checkbox
                      v-model="item.ischcked"
                      checked-color="#45B7FF"
                      name="addcart"
                    ></van-checkbox>
                  </van-col>
                   <van-col span="21">
                      <van-card class="tl pt10 pb10" :title="item.ps_main_title" :thumb="item.img_thumb"  @click.stop="go_detail(item.p_id,item.ps_id)"
              :data-id="item.p_id"
              :data-num="item.ps_id">
                        <div slot="tags" class="mb10">
                           {{item.ps_attr}}
                          <!-- <van-tag plain type="danger" class="general_border general_color">找相似</van-tag> -->
                        </div>

                        <div slot="tags" class="c91">
                          市场参考价&nbsp;&nbsp;
                          <span class="f16 general_color">¥&nbsp;{{item.ps_price_sell}}/{{item.ps_unit}}</span>
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
            <van-checkbox @change="allselect" v-model="ischecked" checked-color="#45B7FF">全选</van-checkbox>
          </div>
          <div>
            <van-button @click="intoCart" type="default">加入购物车</van-button>
          </div>
        </div>
      </van-popup>
    </div>
</template>
<script>
import HeadSearch from "../components/common/HeadSearch"
import { getBillall, getBillallAttr,getlistByBill,getlistByBillSKU,getCartAddweb,getCartQuery } from "../api"
import {local} from '@/until/data';
export default {
    name:'oeder-menu',
    components:{
      HeadSearch
    },
    data () {
      return {
        show: false,
        checked: false,
        bill_name: [],
        bill_attr: [],
        all_attr: [],
        isTrue: false,
        list: [],
        loading: false,
        finished: false,
        params: {
          pager_offset:0,
          ps_main_title: '',
          bill_id:'',
          av_id:''
        },
        specList: [],
        specListLen: 0,
        ischecked: false,
        user:local.get('userinfo')
      }
    },
    created () {
      this.init()
       if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
     if(local.get('searchval')){
 this.params.ps_main_title = local.get('searchval');
  this.initialization()

    }
    },
    methods: {
       initialization(){
         this.list = [];
            this.params.pager_offset=0;
            this.loading = true;//下拉加载中
            this.finished = false;//下拉结束
            if(this.loading){
                this.onLoad()
            }
        },
        onLoad() {
          setTimeout(() => {
            var params=this.params
            this.Handledishes(params)
          }, 500);
    },
      /**
       *  getBillall 获取菜单
       * getBillallAttr 获取全部下得属性
       */
      init () {
        let self = this
        getBillall().then((v)=>{
          let id =""
          self.bill_name = v.data.pager_list
          // if(JSON.parse(v.data.pager_list[0].bill_attr).k_value!=null){
          //    self.bill_attr = JSON.parse(v.data.pager_list[0].bill_attr).k_value
          // }
         self.all_attr = v.data.pager_list.attrList
          self.params.bill_id = id;
           v=null;
           this.getTwobill_name(v)

          // self.Handledishes()
        })
        // getBillallAttr({ av_type: 2 }).then(v => {
        //   if (v.data.pager_list.length !== 0) {
        //     self.all_attr = v.data.pager_list
        //   }
        // })
      },
      /**
       * 点击弹出购车选项
       */
      handleTag (event,id) {
        let self = this
        this.ischecked = false
        getlistByBillSKU({id: id}).then(v => {
          self.specList = v.data
          self.specListLen = v.data.length
          this.show = true
        })
      },
      /**
       * 获取菜单下得属性
       */
      Handlebill (v,title) {
        // this.list = []
        // this.params = {
        //   pager_offset:0,
        //   pager_openset:10
        // }
        // this.finished = false
        // this.loading = false
        this.bill_attr=[]
        this.initialization()
        if (v === 'a') {
          this.isTrue = true
            this.params.bill_id = ''
          // this.Handledishes('')
          return
        }
        this.isTrue = false
        this.params.bill_id = v
        this.getTwobill_name(v)
        // this.Handledishes(self.params)
      },
      /**
       * 获得菜单列表
       */
      Handledishes (params) {
        let self = this
        // let params = this.params
        getlistByBill(params).then(v => {
          v.data.forEach(element => {
            self.list.push(element)
          });
          
          this.loading = false

          if (v.data.length === 0) {
            this.finished = true
          }
         self.params.pager_offset= self.params.pager_offset+ 10;
        
        })
      },
      /**
       * 点击套餐下得属性获得列表
       */
      HandlebillCombo (p) {
        // this.list = []
        // let str = `"v_id":${p}`
        // this.params = {
        //   pager_offset:0,
        //   pager_openset:10,
        //   co_attr: str
        // }
        this.params.av_id=p
        // this.finished = false
        // this.loading = false
            this.initialization()
        // this.Handledishes(this.params)
      },
      /**
       * 点击全部下的属性获得列表
       */
      allHandlebillCombo (p) {
        // this.list = []
        // let str = `"av_id":${p}`
        //   this.params = {
        //   pager_offset:0,
        //   pager_openset:10,
        //   co_attr: str
        // }
        this.params.av_id=p
        // this.finished = false
        // this.loading = false
            this.initialization()
        // this.Handledishes(this.params)
      },
      /**
       * 菜单下属性获取
       */
      getTwobill_name (v) {
        let arr = this.bill_name
        for(let i in arr) {
          if (arr[i].bill_id === v) {
             for(let j in arr[i].attrList){
                   this.bill_attr.push({v_name:arr[i].attrList[j].v_name,v_id:arr[i].attrList[j].v_id})
             }
            // this.bill_attr =arr[i].attrList.v_name
        
        
          }
        }
      },
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
        
        getCartAddweb({list, "c_id":this.user.c_id}).then(response => {
            if (response.code == 210) {
              this.$toast("加入购物车成功");
              this.show = false;
              let data1 = {
                c_id: this.user.c_id
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
      /**
       * 搜索
       */
      getvalue (v) {
        // this.list = []
        let str = v
        // this.params = {
        //   pager_offset:0,
        //   pager_openset:10,
        //   co_name: str
        // }
         this.params.ps_main_title=str
          if(this.params.ps_main_title==''){
    this.$toast("请输入搜索关键字");
 }else{
   this.initialization()
 }
        // this.finished = false
        // this.loading = false
         
        // this.Handledishes(this.params)
      },
      /**
       * 进入详情页
       */
      intoDetail (detail) {
        let co_id = JSON.stringify(detail)
        this.$router.push({
          path: '/introducemenu',
          query: { co_id }
        })
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
<style lang="scss" >
.oeder-menu .van-search__content {
    background-color: #f7f8fa !important;
  }
.search-tab {
  div{ width: 78px;}
  div:nth-child(4n+4){
      margin-right: 0px;
  }
}
.van-card{
.van-card__title{
      max-height: 40px;
  font-size: 17px;
   font-weight:bold;
  margin-bottom: 10px;
      padding-top: 5px;
}
.van-card__desc{
    font-size: 14px;
        width: 80%;
    overflow: inherit;
    white-space: inherit;
    text-overflow: inherit;
     text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  max-height: inherit;
}
.van-tag{
  padding: 3px 8px;
  border-radius: 9px;

}
.addCar{
    width:26px;
  height:26px;
  line-height: 26px;
  border-radius: 50%;
  padding: 0px;
  color: #fff !important;
  }
  .van-image img{
        border-radius: 11px;
  }
}
.introduceMenu-tab{
  height: 51px;
  padding: 0 16px;
  background:#fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.introduceMenu-contrain-list-h{
  padding-left: 0.75rem;
  font-size: 0.7rem;
  color:#919191;
  height: 2.5rem;
  line-height: 2.5rem;
}
.van-button--default{
    color: #fff;
    background-color: #45B7FF;
}
.van-tabs1 {
  .van-tabs__wrap {
    height: inherit;
    .van-tabs__nav--card {
      box-sizing: border-box;
      height: inherit;
      border: none;
      border-radius: 0px;

      .van-tab {
        padding: 8px 13px !important;
        background-color: #f5f5f5 !important;
        color: #282828 !important;
        line-height: 1 !important;
        border-right: none !important;
        margin-right: 10px !important;
        border-radius: 4px !important;
        
      }
      .van-tab--active {
        color: #fff !important;
        background-color: #45B7FF !important;
      }
    
    }
  }
}



 .oeder-menu .van-tabs__nav--card {
      background-color: #fff !important;
      }
</style>
