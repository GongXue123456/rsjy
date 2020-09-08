<template>
  <div>
    <div v-for="(item, index) in items" :key="index" class="van-clearfix" style="clear:both">
      <van-card
        style="clear:both"
        class="tl van-clearfix"
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
          <span
            class="f16 general_color"
          >¥&nbsp;{{ item.ps_price_sell.toFixed(2) }}/{{item.ps_unit}}</span>
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
</template>
<script>
import { getCartAdd, getCartQuery } from "../../api/index";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { local } from "../../until/data";
export default {
  props: {
    items: {
      type: Array,
      required: true,
     
    }
  },
  data(){
    return{
       user:local.get('userinfo')
    }
  },
  created(){
    if (!this.user) {
         this.$router.push({
          name: "LoginView"
        });
     }
  },
  methods: {
    go_detail(id,psid) {
      let choose_goods = {};
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].p_id == id) {
          choose_goods = this.items[i];
        }
      }
      //  localStorage.setItem("id",id);
      // localStorage.setItem("choose_goods", JSON.stringify(choose_goods));
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
  padding: 10px 15px;
  background-color: #fff;
  .van-card__title {
        max-height: 40px;
    font-size: 17px;
        font-weight:bold;
    margin-bottom: 5px;
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
