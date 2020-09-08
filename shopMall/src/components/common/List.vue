<template>
  <div>
    <!-- <div v-if="mold === 'thumbnail'">
      <div v-for="(item, index) in items" :key="index">
        <van-card
          class="tl"
          :title="item.ps_main_title"
          :thumb="item.ps_detail_img"
          @click.stop="go_goodsInfo(item.p_id)"
        >
          <div slot="tags" class="mb10">
            <van-tag plain type="danger" class="general_border general_color">找相似</van-tag>
          </div>
          <div slot="tags" class="c91">
            市场参考价&nbsp;&nbsp;
            <span class="f16 general_color">¥&nbsp;{{ item.ps_price_sell }}&nbsp;&nbsp;{{ item.sales }}</span>
            <van-tag plain class="fr addCar general_bgc tc iconfont f20 icon-gouwuche cfff"></van-tag>
          </div>
        </van-card>
      </div>
    </div>-->
    <div v-if="mold === 'home'">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div v-for="(item,index) in expectList" :key="index">
          <van-checkbox
            v-if="mold != 'home'"
            v-model="checked"
            checked-color="#45B7FF"
            @click="checkClick"
          ></van-checkbox>
          <div>
            <van-card
              class="tl pt10 pb10"
              :title="item.ps_main_title"
              :thumb="item.img_thumb"
              @click.stop="go_detail(item.p_id,item.ps_id)"
              :data-id="item.p_id"
              :data-num="item.ps_id"
            >
              <div slot="tags" class="mb5">
               {{item.ps_attr}}
                <!-- <van-tag plain type="danger" class="general_border general_color">找相似</van-tag> -->
              </div>
              <div slot="tags" class="c91">
                市场参考价&nbsp;&nbsp;
                <span class="f16 general_color">¥&nbsp;{{item.ps_price_sell.toFixed(2)}}/{{item.ps_unit}}</span>
                <van-tag
                  plain
                  class="fr addCar general_bgc tc iconfont f20 icon-gouwuche cfff"
                  @click.stop="addCar(item.ps_id)"
                  :data-id="item.ps_id"
                ></van-tag>
              </div>
            </van-card>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>
<script>
import {
  getHomeExpect,
  getHomeRecommend,
  getCartAdd,
  getCartQuery
} from "../../api/index";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { local } from "@/until/data";
export default {
  props: {
    mold: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      checked: false,
      expectList: [],
      pageNumber: 0,
      pageNumber1: 0,
      loading: false,
      finished: false,
      user:local.get('userinfo')
    };
  },
  created() {
    if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
  },
  methods: {
    checkClick() {
      this.$emit("myevent", 12);
    },
    getData() {
      var _this = this;
      if (local.get("userinfo") != null) {
        let data = {
          c_id: this.user.c_id,
          pager_offset: this.pageNumber
        };
        getHomeExpect(data).then(response => {
          if (response.code == 200) {
            if (response.data.length > 0) {
              this.expectList = this.expectList.concat(response.data);
              this.loading = false;
              this.pageNumber = this.pageNumber + 10;
            } else {
              this.getData1();
            }
          } else {
            this.$toast({
              message: response.msg,
              duration: 5000
            });
          }
        });
      } else {
        this.getData1();
      }
    },
    getData1() {
      let data = {
        pager_offset: this.pageNumber1,
        c_id:''
      };
      getHomeRecommend(data).then(response => {
        if (response.code == 200) {
          this.expectList = this.expectList.concat(response.data);
          this.loading = false;
          if (response.data.length < 10) {
            this.finished = true;
          }
          this.pageNumber1 = this.pageNumber1 + 10;
        } else {
          this.$toast({
            message: response.msg,
            duration: 5000
          });
        }
      });
    },
    onLoad() {
      setTimeout(() => {
        this.getData();
      }, 500);
    },
    go_detail(id,psid) {
      let choose_goods = {};
      this.$router.push({
        name: "DetailView",
        query: {
          id: id,
          psid:psid
        }
      });
    },
    addCar(id) {
      let ids = [];
      ids.push(id);
     let data = { list: ids, c_id: this.user.c_id };
        getCartAdd(data).then(response => {
          if (response.code == 210) {
            this.$toast("已经添加到购物车");
            let data1 = {
              c_id: this.user.c_id
            };
            getCartQuery(data1).then(response => {
              if (response.code == 200) {
                var data = response.data;
                this.$store.dispatch("cart/addGoods", data);
              }
            });
          } else {
            this.$toast({
              message: response.msg,
              duration: 5000
            });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
/deep/ .van-card {
  margin-top: 0px;
  .van-card__title {
        max-height: 40px;
    font-size: 17px;
    font-weight:bold;
    margin-bottom:5px;
        padding-top: 5px;
    color: #282828;
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
  .van-image img{
        border-radius: 11px;
  }
}
</style>

